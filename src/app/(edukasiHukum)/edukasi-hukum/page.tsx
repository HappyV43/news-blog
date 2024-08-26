import { logOutSession } from "@/app/(auth)/auth/admin/auth.action";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/validate";
import { redirect } from "next/navigation";

export default async function EdukasiHukum() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/admin");
  }
  return (
    <main>
      edukasi hukum
      <h1>{user.email}</h1>
      <form action={logOutSession}>
        <Button>Sign out</Button>
      </form>
    </main>
  );
}
