import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import type { CategoryId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop ITEL Inverters, Batteries & Solar Panels",
  description:
    "Browse genuine ITEL Energy products — hybrid inverters, lithium batteries, solar panels and all-in-one power stations at reseller prices.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const category = params.category as CategoryId | undefined;
  const query = (params.q || "").trim().toLowerCase();

  let filtered = PRODUCTS;
  if (category && CATEGORIES.some((c) => c.id === category)) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.replace(/-/g, " ").includes(query)
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <p className="mt-1 text-gray-500">
        Genuine ITEL Energy products at reseller prices.
      </p>

      <form method="GET" action="/products" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="q"
          defaultValue={params.q || ""}
          placeholder="Search products…"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <select
          name="category"
          defaultValue={category || ""}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Search
        </button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !category
              ? "bg-brand-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.id}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              category === c.id
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No products match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
