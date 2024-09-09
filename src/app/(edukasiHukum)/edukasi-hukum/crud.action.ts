"use server";
import { createPostType, updatePostType } from "@/lib/postTypes";

import { generateIdFromEntropySize } from "lucia";
import { del, put } from "@vercel/blob";
import { db } from "@/app/db/drizzle";
import { post } from "@/app/db/schema";
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const makePost = async (prevState: unknown, formData: FormData) => {
  // check cookie dan ambil token dari user
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;
  const { user } = await lucia.validateSession(sessionId);

  //looping zod
  const validateFields = createPostType.safeParse(
    Object.fromEntries(formData.entries())
  );

  // memberikan objek dengan error untuk setiap field.
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }
  const { title, image, content } = validateFields.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  const [checkPost] = await db
    .select()
    .from(post)
    .where(and(eq(post.title, title), eq(post.content, content)));

  if (checkPost) {
    return {
      message: "title and content already in database",
    };
  }
  try {
    const postId = generateIdFromEntropySize(10);
    await db
      .insert(post)
      .values({
        id: postId,
        userId: user!.id,
        title: title,
        content: content,
        gambar: url,
      })
      .returning()
      .then((res) => res[0]);
  } catch (error) {
    console.error("Error inserting post:", error);
  }
  revalidatePath("/");
  redirect("/");
};

export const getAllPost = async () => {
  try {
    const result = await db.select().from(post).orderBy(post.createdAt);
    return result;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const getPostById = async (id: string) => {
  const [specificPost] = await db
    .select()
    .from(post)
    .where(eq(post.id, id))
    .limit(1);

  return specificPost;
};

export const updateNewsPost = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = updatePostType.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await getPostById(id);
  if (!data) return { message: "No Data Found" };

  const { title, content, image } = validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.gambar;
  } else {
    await del(data.gambar);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await db
      .update(post)
      .set({
        title: title,
        content: content,
        gambar: imagePath,
      })
      .where(eq(post.id, id));
  } catch (error) {
    return { message: "Failed to update data" };
  }

  revalidatePath("/edukasi-hukum");
  revalidatePath(`/edukasi-hukum/${id}`);
  redirect("/edukasi-hukum");
};

export const deleteNewsPost = async (id: string) => {
  const data = await getPostById(id);
  if (!data) return { message: "No data found" };
  await del(data.gambar);
  try {
    await db.delete(post).where(eq(post.id, id));
  } catch (error) {
    throw new Error("Error deleting data");
  }
  revalidatePath("/edukasi-hukum");
  redirect("/edukasi-hukum");
};
