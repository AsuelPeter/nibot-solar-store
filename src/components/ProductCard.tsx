"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatNaira } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative flex h-40 items-center justify-center rounded-t-xl bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-bold text-gray-900">
          {formatNaira(product.price)}
        </p>

        <div className="mt-auto pt-4 flex gap-2">
          <button
            onClick={onAdd}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
              added ? "bg-solar-500" : "bg-brand-600 hover:bg-brand-700"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
          <Link
            href={`/product/${product.id}`}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
