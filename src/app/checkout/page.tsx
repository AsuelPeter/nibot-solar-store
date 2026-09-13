"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProduct, formatNaira } from "@/lib/products";
import { getBankDetails } from "@/lib/payment";
import type { Customer, PaymentMethod } from "@/lib/types";

const DELIVERY_FEE = 15000;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const bank = getBankDetails();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    notes: "",
    delivery: "delivery" as "delivery" | "pickup",
  });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("bank-transfer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Nothing to checkout</h1>
        <p className="mt-2 text-gray-500">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const deliveryFee = form.delivery === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const customer: Customer = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      state: form.state,
      notes: form.notes,
      delivery: form.delivery,
    };

    const orderItems = items
      .map((i) => {
        const p = getProduct(i.productId);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: i.quantity,
        };
      })
      .filter(Boolean);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: orderItems,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }
      clearCart();
      router.push(`/order-success/${data.order.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Delivery Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Name *</label>
                <input
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={labelClass}>Phone / WhatsApp *</label>
                <input
                  required
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+234 708 300 3833"
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Address *</label>
                <input
                  required
                  className={inputClass}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Street, house number"
                />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input
                  className={inputClass}
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Order Notes</label>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any special delivery instructions…"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Delivery Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label
                className={`cursor-pointer rounded-lg border p-4 ${
                  form.delivery === "delivery"
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "delivery"}
                  onChange={() => update("delivery", "delivery")}
                  className="mr-2"
                />
                <span className="font-medium text-gray-900">Home Delivery</span>
                <span className="block text-sm text-gray-500">
                  Flat fee {formatNaira(DELIVERY_FEE)}
                </span>
              </label>
              <label
                className={`cursor-pointer rounded-lg border p-4 ${
                  form.delivery === "pickup"
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "pickup"}
                  onChange={() => update("delivery", "pickup")}
                  className="mr-2"
                />
                <span className="font-medium text-gray-900">Store Pickup</span>
                <span className="block text-sm text-gray-500">Free</span>
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label
                className={`cursor-pointer rounded-lg border p-4 ${
                  paymentMethod === "bank-transfer"
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank-transfer"}
                  onChange={() => setPaymentMethod("bank-transfer")}
                  className="mr-2"
                />
                <span className="font-medium text-gray-900">Bank Transfer</span>
                <span className="block text-sm text-gray-500">
                  Pay now via Moniepoint transfer
                </span>
              </label>
              <label
                className={`cursor-pointer rounded-lg border p-4 ${
                  paymentMethod === "cash-on-delivery"
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cash-on-delivery"}
                  onChange={() => setPaymentMethod("cash-on-delivery")}
                  className="mr-2"
                />
                <span className="font-medium text-gray-900">Cash on Delivery</span>
                <span className="block text-sm text-gray-500">
                  Pay when you receive your order
                </span>
              </label>
            </div>

            {paymentMethod === "bank-transfer" && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-900">
                  Transfer {formatNaira(total)} to:
                </p>
                <div className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-semibold">{bank.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Name</span>
                    <span className="font-semibold">{bank.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-semibold tracking-wide">
                      {bank.accountNumber}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  After paying, submit your transfer reference on the confirmation
                  page so we can verify it quickly.
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((i) => {
              const p = getProduct(i.productId);
              if (!p) return null;
              return (
                <div key={i.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {p.name} × {i.quantity}
                  </span>
                  <span className="font-medium">
                    {formatNaira(p.price * i.quantity)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>{deliveryFee ? formatNaira(deliveryFee) : "Free"}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {submitting
              ? "Placing order…"
              : paymentMethod === "bank-transfer"
                ? "Place Order & Pay via Transfer"
                : "Place Order (Pay on Delivery)"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">
            {paymentMethod === "bank-transfer"
              ? "You'll be shown transfer details after placing your order."
              : "Payment is made in cash on delivery/collection."}
          </p>
        </div>
      </form>
    </div>
  );
}
