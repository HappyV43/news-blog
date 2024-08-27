import { db } from "@/app/db/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { lucia } from "./lucia";
import { user as userTable } from "@/app/db/schema";

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;
  const { session, user } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      //refreshing session cookie mereka
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Session validation error:", error);
  }
  if (!user) return null;
  const dbUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user.id))
    .limit(1)
    .then((results) => results[0]);
  return dbUser;
};
