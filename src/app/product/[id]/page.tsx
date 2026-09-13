import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, formatNaira } from "@/lib/products";
import { AddToCart } from "@/components/AddToCart";
import { ShareButtons } from "@/components/ShareButtons";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, STORE_NAME, waLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    alternates: { canonical: `${SITE_URL}/product/${product.id}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    sku: product.id,
    brand: { "@type": "Brand", name: "ITEL Energy" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: "NGN",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: STORE_NAME },
    },
  };

  const whatsappOrderMessage = `Hello, I want to order: ${product.name} (${formatNaira(
    product.price
  )}). Is it available?`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd data={productJsonLd} />

      <nav className="text-sm text-gray-500">
        <Link href="/products" className="hover:text-gray-700">
          Products
        </Link>
        <span className="mx-1">/</span>
        <span className="capitalize">{product.category.replace(/-/g, " ")}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-2xl bg-white p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          {product.tag && (
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              {product.tag}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-500">{product.description}</p>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {formatNaira(product.price)}
          </p>
          <p className="mt-1 text-sm text-gray-500">per {product.unit}</p>

          <div className="mt-6">
            <h2 className="font-semibold text-gray-900">Key Features</h2>
            <ul className="mt-2 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-700 text-xs">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <AddToCart product={product} />

          <a
            href={waLink(whatsappOrderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Order via WhatsApp
          </a>

          <div className="mt-4">
            <ShareButtons title={product.name} path={`/product/${product.id}`} />
          </div>

          <p className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            Payment on delivery or bank transfer. Nationwide delivery available.
            For large C&amp;I projects,{" "}
            <Link href="/installers" className="font-semibold text-brand-700">
              book a site survey
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
