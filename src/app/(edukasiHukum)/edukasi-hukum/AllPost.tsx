import React from "react";
import { getAllPost } from "./crud.action";
import Image from "next/image";
import Link from "next/link";

export default async function AllPost() {
  
  // ambil semua post dan rendering semua dimain page
  const allPost = await getAllPost();
  return (
    <main>
      {allPost.map((item) => (
        <Link href={`/edukasi-hukum/${item.id}`}>
          <div key={item.id} className="hover:shadow-2xl">
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
        </Link>
      ))}
    </main>
  );
}
