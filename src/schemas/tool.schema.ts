import { z } from "zod";

export const getOrderArgsSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

export type GetOrderArgs = z.infer<typeof getOrderArgsSchema>;
