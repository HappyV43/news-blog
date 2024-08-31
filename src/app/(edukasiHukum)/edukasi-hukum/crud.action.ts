"use server";
import { createPost } from "@/lib/postTypes";

import { generateIdFromEntropySize } from "lucia";
import { put } from "@vercel/blob";
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
  const validateFields = createPost.safeParse(
    Object.fromEntries(formData.entries())
  );

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
