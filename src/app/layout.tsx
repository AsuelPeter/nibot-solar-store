import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  BUSINESS_NAME,
  STORE_NAME,
  PHONE_DISPLAY,
  EMAIL,
  ADDRESS,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE_NAME} — ITEL Energy Solutions`,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Buy genuine ITEL inverters, lithium batteries, solar panels and all-in-one power stations in Nigeria. Professional solar installation nationwide. Pay on delivery.",
  keywords: [
    "ITEL inverter Nigeria",
    "solar inverter",
    "lithium battery Nigeria",
    "solar panels Port Harcourt",
    "ITEL Energy",
    "inverter and battery",
    "solar installation Nigeria",
    "renewable energy",
  ],
  icons: { icon: "/logo-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: STORE_NAME,
    title: `${STORE_NAME} — ITEL Energy Solutions`,
    description:
      "Genuine ITEL inverters, lithium batteries, solar panels and all-in-one power stations with professional installation.",
    images: [{ url: "/logo.png", width: 1080, height: 1080, alt: BUSINESS_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — ITEL Energy Solutions`,
    description:
      "Genuine ITEL inverters, lithium batteries, solar panels and power stations.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  alternateName: STORE_NAME,
  description:
    "Authorized reseller of ITEL Energy products — inverters, lithium batteries, solar panels and all-in-one power stations.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  email: EMAIL,
  telephone: PHONE_DISPLAY,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: "Port Harcourt",
    addressCountry: "NG",
  },
  areaServed: "Nigeria",
  priceRange: "₦₦₦",
};

const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GA_ID || "G-EWT8T8G62H";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <JsonLd data={organizationJsonLd} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `}
        </Script>
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
