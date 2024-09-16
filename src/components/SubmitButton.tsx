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
      className="bg-green-500 hover:bg-green-300 text-gray-900 font-medium px-4 py-2  w-full flex-1 shadow-xl"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
