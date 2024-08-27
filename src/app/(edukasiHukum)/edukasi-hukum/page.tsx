import { logOutSession } from "@/app/(auth)/auth/admin/auth.action";
import { getUser } from "@/lib/validate";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import CreatePost from "./CreatePost";
import { getAllPost } from "./crud.action";
import Image from "next/image";

export default async function EdukasiHukum() {
  const user = await getUser();
  const allPost = await getAllPost();
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
      {allPost.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <Image
            src={item.gambar}
            alt={item.title}
            height={420}
            width={740}
            className="rounded-t-md object-cover"
          />
        </div>
      ))}
    </main>
  );
}
