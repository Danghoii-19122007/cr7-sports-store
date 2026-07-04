// Simple in-memory database for orders
// In production, replace with real database (PostgreSQL, MongoDB, etc)

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: "card" | "momo" | "vnpay" | "cod";
  status: "pending" | "paid" | "failed" | "shipped" | "delivered";
  momoTransId?: string;
  createdAt: Date;
  updatedAt: Date;
}

class OrderDatabase {
  private orders: Map<string, Order> = new Map();

  async createOrder(data: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">): Promise<Order> {
    const order: Order = {
      id: Date.now().toString(),
      ...data,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(order.orderId, order);
    console.log(`📦 Order created: ${order.orderId}`);
    return order;
  }

  async getOrderByMomoId(orderId: string): Promise<Order | undefined> {
    return this.orders.get(orderId);
  }

  async updateOrderStatus(
    orderId: string,
    status: Order["status"],
    momoTransId?: string
  ): Promise<Order | null> {
    const order = this.orders.get(orderId);
    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date();
    if (momoTransId) order.momoTransId = momoTransId;

    this.orders.set(orderId, order);
    console.log(`📦 Order updated: ${orderId} → ${status}`);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrdersByCustomer(email: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.customerEmail === email
    );
  }
}

export const orderDatabase = new OrderDatabase();

// TODO: Replace with real database in production
// Example with Prisma:
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const orderDatabase = {
//   createOrder: (data) => prisma.order.create({ data }),
//   getOrderByMomoId: (id) => prisma.order.findUnique({ where: { orderId: id } }),
//   updateOrderStatus: (id, status, transId) => prisma.order.update({
//     where: { orderId: id },
//     data: { status, momoTransId: transId, updatedAt: new Date() }
//   }),
// };
