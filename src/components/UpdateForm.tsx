"use client";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useFormState } from "react-dom";
import { updateNewsPost } from "@/app/(edukasiHukum)/edukasi-hukum/crud.action";

type DataProp = {
  id: string;
  title: string;
  content: string;
  gambar: string;
};
export default function UpdateForm({ data }: { data: DataProp }) {
  const [state, formAction] = useFormState(
    updateNewsPost.bind(null, data.id),
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update News Post</DialogTitle>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <form action={formAction}>
                <div className="mb-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      type="text"
                      placeholder="Title"
                      name="title"
                      defaultValue={data.title || ""}
                    />
                    <p className="text-sm text-red-500 mt-2">
                      {state?.error?.title}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      placeholder="Content"
                      name="content"
                      defaultValue={data.content || ""}
                    />
                    <p className="text-sm text-red-500 mt-2">
                      {state?.error?.content}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" name="image" />
                    <p className="text-sm text-red-500 mt-2">
                      {state?.error?.image}
                    </p>
                  </div>
                </div>
                <footer className="flex flex-col sm:flex-row gap-2 w-full">
                  <SubmitButton>Update Post</SubmitButton>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="flex-1 w-full bg-red-400 text-gray-900 shadow-xl hover:bg-red-300"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </footer>
              </form>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
