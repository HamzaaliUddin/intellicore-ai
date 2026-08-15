import { getOrder } from "./order.tool.js";
import { getOrderArgsSchema } from "../schemas/tool.schema.js";

export const executeTool = async (
  toolName: string,
  args: unknown
): Promise<unknown> => {
  switch (toolName) {
    case "get_order": {
      const result = getOrderArgsSchema.safeParse(args);

      if (!result.success) {
        throw new Error("Invalid get_order arguments");
      }

      return getOrder(result.data.orderId);
    }

    default:
      throw new Error(`Unsupported tool: ${toolName}`);
  }
};