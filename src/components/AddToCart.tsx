"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/CartProvider";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-lg border border-gray-300">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-2.5 text-gray-600 hover:bg-gray-50"
        >
          −
        </button>
        <span className="w-12 text-center text-sm font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-2.5 text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <button
        onClick={onAdd}
        className={`flex-1 rounded-lg px-6 py-3 text-sm font-semibold text-white transition ${
          added ? "bg-solar-500" : "bg-brand-600 hover:bg-brand-700"
        }`}
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
