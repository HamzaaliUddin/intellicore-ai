import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

export type ChatInput = z.infer<typeof chatSchema>;