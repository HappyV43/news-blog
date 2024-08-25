"use server";

import { z } from "zod";
import { registerSchema } from "./regsiter";
import { db } from "@/app/db/drizzle";
import { user } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export const register = async (value: z.infer<typeof registerSchema>) => {
  console.log("di server", value);
  try {
    // kalo ada user
    const existUser = await db
      .select()
      .from(user)
      .where(eq(user.email, value.email));

    if (existUser.length > 0)
      return { error: "sorry user already exists", success: false };

    //generate id
    const userId = generateIdFromEntropySize(10);
    //generate hash pass
    const hashedPassword = await new Argon2id().hash(value.password);
    //masukin ke db
    await db.insert(user).values({
      id: userId,
      name: value.name,
      email: value.email,
      passwordHash: hashedPassword,
    });
    //buat session buat user
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "something went wrong",
      success: false,
    };
  }
};
