import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

export const supportAnalysisSchema = z.object({
  category: z.enum([
    "payment",
    "shipping",
    "refund",
    "account",
    "other",
  ]),
  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),
  needsHumanReview: z.boolean(),
});

export type ChatInput = z.infer<typeof chatSchema>;

export type SupportAnalysis = z.infer<
  typeof supportAnalysisSchema
>;