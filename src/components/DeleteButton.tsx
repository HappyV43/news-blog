"use client";

import { deleteNewsPost } from "@/app/(edukasiHukum)/edukasi-hukum/crud.action";
import { Button } from "./ui/button";

export const DeleteButton = ({ id }: { id: string }) => {
  const deleteImageWithId = deleteNewsPost.bind(null, id);
  return (
    <form
      action={deleteImageWithId}
      className="py-3 text-sm bg-gray-50 rounded-br-md w-full hover:bg-gray-100 text-center"
    >
      <Button>Delete</Button>
    </form>
  );
};
