import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

export const supportAnalysisSchema = z.object({
  category: z.enum(["payment", "shipping", "refund", "account", "other"]),
  priority: z.enum(["low", "medium", "high"]),
  needsHumanReview: z.boolean(),
});

export const embeddingSchema = z.object({
  text: z.string().min(1, "Text is required").max(5000, "Text is too long"),
});
export const addDocumentSchema = z.object({
  id: z.string().min(1, "Document ID is required"),
  content: z.string().min(1, "Content is required"),
});

export const searchSchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export type ChatInput = z.infer<typeof chatSchema>;

export type SupportAnalysis = z.infer<typeof supportAnalysisSchema>;

export type EmbeddingInput = z.infer<typeof embeddingSchema>;

export type AddDocumentInput = z.infer<typeof addDocumentSchema>;

export type SearchInput = z.infer<typeof searchSchema>;
