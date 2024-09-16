import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostById } from "../crud.action";
import UpdateForm from "@/components/UpdateForm";
import { DeleteButton } from "@/components/DeleteButton";

export default async function EdukasiHukumPost({
  params,
}: {
  params: { id: string };
}) {
  // ambil id params
  const { id } = params;

  // getting post by id
  const getPost = async () => {
    const specificPost = await getPostById(id);
    if (!specificPost) {
      notFound();
    }
    return specificPost;
  };

  const specificPost = await getPost();

  // checking post kalo post ada atau engga
  if (!specificPost) {
    return notFound();
  }

  return (
    <main>
      <UpdateForm data={specificPost} />
      <DeleteButton id={specificPost.id} />
      <h1>{specificPost.title}</h1>
      <p>{specificPost.content}</p>
      <Image
        src={specificPost.gambar}
        alt={specificPost.title}
        height={420}
        width={740}
        className="rounded-t-md object-cover"
      />
    </main>
  );
}
