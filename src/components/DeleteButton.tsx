"use client";

import { deleteNewsPost } from "@/app/(edukasiHukum)/edukasi-hukum/crud.action";
import { Button } from "./ui/button";

export const DeleteButton = ({ id }: { id: string }) => {
  const deleteImageWithId = deleteNewsPost.bind(null, id);
  return (
    <form action={deleteImageWithId} className="py-3 text-sm rounded-br-md">
      <Button>Delete</Button>
    </form>
  );
};
