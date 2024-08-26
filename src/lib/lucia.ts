import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/app/db/drizzle";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { user, session } from "@/app/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    name: "cookie-auth",
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});


