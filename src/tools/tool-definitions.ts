export const getOrderToolDefinition = {
  type: "function" as const,
  name: "get_order",
  description: "Get current information about an order",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      orderId: {
        type: "string",
        description: "The ID of the order",
      },
    },
    required: ["orderId"],
    additionalProperties: false,
  },
};