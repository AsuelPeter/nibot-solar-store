export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nibotsolar.com";

export const BUSINESS_NAME = "NIBOT ENGINEERING";
export const STORE_NAME = "NIBOT Solar Store";
export const TAGLINE = "ITEL Energy Solutions";

export const PHONE_DISPLAY = "+234 708 300 3833";
export const PHONE_DIGITS = "2347083003833";
export const EMAIL = "nibotengineering@gmail.com";
export const ADDRESS = "Block J035 Port Harcourt International Market";

export function waLink(message?: string): string {
  const base = `https://wa.me/${PHONE_DIGITS}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
