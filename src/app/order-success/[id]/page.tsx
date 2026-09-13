import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";
import { formatNaira } from "@/lib/products";
import { PaymentProofForm } from "@/components/PaymentProofForm";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Order Placed!</h1>
      <p className="mt-2 text-gray-500">
        Thank you, {order.customer.name}. Your order has been received.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="text-sm text-gray-500">Order ID</span>
          <span className="font-semibold text-gray-900">{order.id}</span>
        </div>
        <div className="mt-3 space-y-2">
          {order.items.map((it) => (
            <div key={it.productId} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {it.name} × {it.quantity}
              </span>
              <span className="font-medium">{formatNaira(it.price * it.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-gray-100 pt-3 text-sm">
          <span className="text-gray-600">Delivery</span>
          <span>{order.deliveryFee ? formatNaira(order.deliveryFee) : "Free"}</span>
        </div>
        <div className="mt-2 flex justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span>{formatNaira(order.total)}</span>
        </div>
        <p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
          {order.customer.delivery === "pickup"
            ? "Store pickup — we will contact you when your order is ready."
            : `Delivery to ${order.customer.address}, ${order.customer.city} ${order.customer.state}.`}{" "}
          We will call {order.customer.phone} to confirm your order.
        </p>

        {order.paymentMethod === "bank-transfer" &&
          order.paymentStatus === "pending" && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <PaymentProofForm orderId={order.id} total={order.total} />
            </div>
          )}
        {order.paymentMethod === "bank-transfer" &&
          order.paymentStatus === "paid" && (
            <p className="mt-4 rounded-lg bg-brand-50 p-3 text-sm font-semibold text-brand-800">
              Payment confirmed — thank you!
            </p>
          )}
      </div>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
