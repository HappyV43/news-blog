import { z } from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const createPostType = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),

  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters long" }),

  image: z
    .instanceof(File)
    .refine((files) => files.size > 0, { message: "image is required" })
    .refine((files) => files.size === 0 || files.type.startsWith("image/"), {
      message: "only image are allowed",
    })
    .refine((files) => files.size <= MAX_UPLOAD_SIZE, {
      message: "Image must be lest than 3MB",
    }),
});

export const updatePostType = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters long" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must less than 4MB",
    })
    .optional(),
});

