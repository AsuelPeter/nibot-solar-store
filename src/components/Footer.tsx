import Link from "next/link";
import { BUSINESS_NAME, PHONE_DISPLAY, EMAIL, ADDRESS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={BUSINESS_NAME}
              className="h-9 w-9 object-contain"
            />
            <span className="font-extrabold text-white">{BUSINESS_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed">
            Authorized reseller of ITEL Energy products — inverters, lithium
            batteries, solar panels and all-in-one power stations.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Shop Products</Link></li>
            <li><Link href="/installers" className="hover:text-white">Installation Services</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Address: <span className="text-white">{ADDRESS}</span></li>
            <li>Phone / WhatsApp: <span className="text-white">{PHONE_DISPLAY}</span></li>
            <li>Email: <span className="text-white">{EMAIL}</span></li>
            <li>Payment on delivery available nationwide.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All prices in Nigerian
          Naira (₦). ITEL Energy is a trademark of its respective owner.
        </div>
      </div>
    </footer>
  );
}
