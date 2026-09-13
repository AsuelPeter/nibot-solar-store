import type { Metadata } from "next";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { PHONE_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Professional Solar Installation",
  description:
    "Certified solar installation for homes and businesses. Free site survey, system design, supply and commissioning nationwide.",
};

const STEPS = [
  {
    title: "Free Site Survey",
    desc: "We visit your location, assess your load and roof/space to determine the right system size.",
  },
  {
    title: "Design & Quotation",
    desc: "You get a tailored design and transparent quote using genuine ITEL components.",
  },
  {
    title: "Professional Installation",
    desc: "Certified technicians install, test and commission your system safely.",
  },
  {
    title: "After-Sales Support",
    desc: "Warranty support and maintenance plans to keep your system running for years.",
  },
];

const WHY = [
  "Certified & insured installation team",
  "Genuine ITEL Energy equipment only",
  "Warranty-backed workmanship",
  "Nationwide service coverage",
];

export default function InstallersPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Professional Solar Installation
          </h1>
          <p className="mt-3 max-w-2xl text-brand-100">
            From site survey to commissioning — our certified team handles
            residential and commercial solar projects end to end.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Why Choose NIBOT Solar?</h2>
            <ul className="mt-6 space-y-4">
              {WHY.map((w) => (
                <li key={w} className="flex items-center gap-3 text-gray-700">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-brand-700 text-sm">
                    ✓
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-gray-50 p-6">
              <h3 className="font-semibold text-gray-900">Need a quick answer?</h3>
              <p className="mt-1 text-sm text-gray-600">
                Call or WhatsApp us at{" "}
                <span className="font-semibold text-gray-900">{PHONE_DISPLAY}</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Book a Free Site Survey
            </h2>
            <div className="mt-4">
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
