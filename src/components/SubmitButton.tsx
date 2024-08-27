"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-green-500 text-gray-900 font-medium px-4 py-2 hover:bg-green-300 w-full flex-1 shadow-xl"
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading..." : children}
    </Button>
  );
}
