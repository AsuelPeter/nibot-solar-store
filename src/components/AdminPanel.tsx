"use client";

import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/products";
import type { Order, OrderStatus, ServiceRequest } from "@/lib/types";

const STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  confirmed: "bg-indigo-100 text-indigo-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const SERVICE_LABELS: Record<ServiceRequest["serviceType"], string> = {
  residential: "Residential",
  commercial: "Commercial / C&I",
  maintenance: "Maintenance",
  consultation: "Consultation",
};

export function AdminPanel({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [tab, setTab] = useState<"orders" | "services">("orders");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [o, s] = await Promise.all([
          fetch("/api/orders").then((r) => r.json()),
          fetch("/api/service-requests").then((r) => r.json()),
        ]);
        if (!cancelled) {
          setOrders(o.orders || []);
          setRequests(s.requests || []);
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authed]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      setError("Invalid password");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setOrders([]);
    setRequests([]);
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    }
  };

  const setPaymentStatus = async (id: string, paymentStatus: "paid" | "pending") => {
    const res = await fetch(`/api/orders/${id}/payment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, paymentStatus } : o))
      );
    }
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <form onSubmit={login} className="mt-4 space-y-4">
            <input
              type="password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 text-sm font-semibold ${
            tab === "orders"
              ? "border-b-2 border-brand-600 text-brand-700"
              : "text-gray-500"
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setTab("services")}
          className={`px-4 py-2 text-sm font-semibold ${
            tab === "services"
              ? "border-b-2 border-brand-600 text-brand-700"
              : "text-gray-500"
          }`}
        >
          Service Requests ({requests.length})
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : tab === "orders" ? (
          orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{o.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(o.createdAt).toLocaleString()} · {o.customer.name} ·{" "}
                        {o.customer.phone}
                      </p>
                    </div>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${STATUS_STYLES[o.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 space-y-1 text-sm">
                    {o.items.map((it) => (
                      <div key={it.productId} className="flex justify-between text-gray-600">
                        <span>
                          {it.name} × {it.quantity}
                        </span>
                        <span>{formatNaira(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Delivery:</span>{" "}
                      {o.customer.delivery === "pickup"
                        ? "Store pickup"
                        : `${o.customer.address}, ${o.customer.city} ${o.customer.state}`}
                      {o.customer.email ? ` · ${o.customer.email}` : ""}
                    </p>
                    <p className="mt-1">
                      <span className="font-medium">Payment:</span>{" "}
                      {o.paymentMethod === "bank-transfer"
                        ? "Bank transfer"
                        : "Cash on delivery"}{" "}
                      ·{" "}
                      <span
                        className={`font-semibold ${
                          o.paymentStatus === "paid"
                            ? "text-green-700"
                            : "text-amber-700"
                        }`}
                      >
                        {o.paymentStatus === "paid" ? "Paid" : "Pending"}
                      </span>
                    </p>
                    {o.transferReference && (
                      <p className="mt-1">
                        <span className="font-medium">Transfer ref:</span>{" "}
                        {o.transferReference}
                      </p>
                    )}
                    {o.receiptImage && (
                      <p className="mt-1">
                        <span className="font-medium">Receipt:</span>{" "}
                        <a
                          href={o.receiptImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand-700 underline"
                        >
                          View
                        </a>
                      </p>
                    )}
                    {o.customer.notes && <p className="mt-1">Notes: {o.customer.notes}</p>}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-4 text-sm font-semibold">
                      <span className="text-gray-600">
                        Subtotal {formatNaira(o.subtotal)}
                      </span>
                      <span className="text-gray-600">
                        Delivery {formatNaira(o.deliveryFee)}
                      </span>
                      <span className="text-gray-900">Total {formatNaira(o.total)}</span>
                    </div>
                    {o.paymentMethod === "bank-transfer" && (
                      <button
                        onClick={() =>
                          setPaymentStatus(
                            o.id,
                            o.paymentStatus === "paid" ? "pending" : "paid"
                          )
                        }
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                          o.paymentStatus === "paid"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-brand-600 text-white hover:bg-brand-700"
                        }`}
                      >
                        {o.paymentStatus === "paid"
                          ? "Mark Unpaid"
                          : "Mark as Paid"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : requests.length === 0 ? (
          <p className="text-gray-500">No service requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {r.name}{" "}
                      <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                        {SERVICE_LABELS[r.serviceType]}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {r.id} · {new Date(r.createdAt).toLocaleString()} · {r.phone}
                      {r.email ? ` · ${r.email}` : ""}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Location:</span> {r.location}
                </p>
                {r.message && (
                  <p className="mt-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                    {r.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
