import { logOutSession } from "@/app/(auth)/auth/admin/auth.action";
import { getUser } from "@/lib/validate";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import CreatePost from "./CreatePost";
import AllPost from "./AllPost";

export default async function EdukasiHukum() {
  const user = await getUser();

  if (!user) {
    redirect(process.env.ADMIN_URL!);
  }
  return (
    <main>
      edukasi hukum
      <h1>{user.email}</h1>
      <form action={logOutSession}>
        <Button>Sign out</Button>
      </form>
      <CreatePost />
      <AllPost />
    </main>
  );
}
