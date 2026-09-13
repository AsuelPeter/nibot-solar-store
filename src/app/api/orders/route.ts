import { NextRequest, NextResponse } from "next/server";
import { createOrder, generateOrderId, listOrders } from "@/lib/orders";
import { requireAdmin } from "@/lib/admin";
import type { Order, PaymentMethod } from "@/lib/types";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  let body: Partial<Order>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { customer, items } = body;
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Missing customer or items" },
      { status: 400 }
    );
  }
  if (!customer.name || !customer.phone || !customer.address) {
    return NextResponse.json(
      { error: "Name, phone and address are required" },
      { status: 400 }
    );
  }

  const paymentMethod: PaymentMethod =
    body.paymentMethod === "bank-transfer"
      ? "bank-transfer"
      : "cash-on-delivery";

  const subtotal = items.reduce(
    (sum: number, it: Order["items"][number]) =>
      sum + it.price * it.quantity,
    0
  );
  const deliveryFee = customer.delivery === "delivery" ? 15000 : 0;

  const order: Order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      address: customer.address,
      city: customer.city || "",
      state: customer.state || "",
      notes: customer.notes || "",
      delivery: customer.delivery === "pickup" ? "pickup" : "delivery",
    },
    items: items.map((it: Order["items"][number]) => ({
      productId: it.productId,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
    })),
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: "new",
    paymentMethod,
    paymentStatus: "pending",
  };

  const saved = await createOrder(order);
  return NextResponse.json({ order: saved }, { status: 201 });
}
