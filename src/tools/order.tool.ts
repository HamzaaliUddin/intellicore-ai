export type Order = {
  id: string;
  status: string;
  estimatedDelivery: string;
};

const orders: Order[] = [
  {
    id: "123",
    status: "shipped",
    estimatedDelivery: "2026-08-18",
  },
  {
    id: "500",
    status: "processing",
    estimatedDelivery: "2026-08-21",
  },
];

export const getOrder = async (
  orderId: string
): Promise<Order | null> => {
  return (
    orders.find((order) => order.id === orderId) ??
    null
  );
};