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
import { loginSchema } from "./login";
import { redirect } from "next/navigation";

export const registerAction = async (value: z.infer<typeof registerSchema>) => {
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

export const loginAction = async (value: z.infer<typeof loginSchema>) => {
  try {
    // check user
    const existingUsers = await db
      .select()
      .from(user)
      .where(eq(user.email, value.email));

    //   kalo gak ada user atau gak ada password
    if (!existingUsers || existingUsers.length === 0) {
      return {
        success: false,
        error: "gak ada user",
      };
    }

    const existingUser = existingUsers[0];

    if (!existingUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // check password
    const passwordMatch = await new Argon2id().verify(
      existingUser.passwordHash,
      value.password
    );

    if (!passwordMatch)
      return {
        success: false,
        error: "Salah password",
      };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      success: true,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const logOutSession = async () => {
  try {
    const sessionCookie = await lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/auth/admin");
  } catch (error) {
    console.error(error);
  }
};
