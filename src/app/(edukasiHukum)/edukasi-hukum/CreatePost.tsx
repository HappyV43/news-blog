"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makePost } from "@/app/(edukasiHukum)/edukasi-hukum/crud.action";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePost() {
  const [state, formAction] = useFormState(makePost, null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <form action={formAction}>
              <div className="mb-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input type="text" placeholder="Title" name="title" />
                  <p className="text-sm text-red-500 mt-2">
                    {state?.error?.title}
                  </p>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea placeholder="Content" name="content" />
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
                <SubmitButton>Create Post</SubmitButton>
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
      </DialogContent>
    </Dialog>
  );
}
