import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/icons";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Authorized ITEL Energy Reseller
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
              Power your home &amp; business with solar energy
            </h1>
            <p className="mt-4 text-lg text-brand-100">
              Inverters, lithium batteries, solar panels and all-in-one power
              stations — with professional installation nationwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-lg bg-solar-500 px-6 py-3 text-sm font-semibold text-white hover:bg-solar-600"
              >
                Shop Products
              </Link>
              <Link
                href="/installers"
                className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Get It Installed
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm transition"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <CategoryIcon icon={c.icon} className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{c.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-gray-900 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-white">
              Professional Solar Installation
            </h2>
            <p className="mt-3 text-gray-300">
              Certified installers for residential and commercial systems. Site
              survey, design, supply and commissioning — done for you.
            </p>
          </div>
          <Link
            href="/installers"
            className="shrink-0 rounded-lg bg-solar-500 px-6 py-3 text-sm font-semibold text-white hover:bg-solar-600"
          >
            Book a Survey
          </Link>
        </div>
      </section>
    </div>
  );
}
