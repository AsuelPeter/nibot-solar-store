"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProduct, formatNaira } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">
          Browse our ITEL Energy products and add something to get started.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-gray-500 hover:text-red-600"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div
                key={item.productId}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="font-semibold text-gray-900 hover:text-brand-700"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-gray-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatNaira(product.price)} each
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-gray-300">
                      <button
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatNaira(product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
