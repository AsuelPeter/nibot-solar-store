"use client";

import { useState } from "react";
import type { ServiceType } from "@/lib/types";

const SERVICES: { id: ServiceType; label: string; desc: string }[] = [
  { id: "residential", label: "Residential Installation", desc: "Homes & apartments" },
  { id: "commercial", label: "Commercial / C&I", desc: "Offices, shops, factories" },
  { id: "maintenance", label: "Maintenance & Repairs", desc: "Existing solar systems" },
  { id: "consultation", label: "Consultation", desc: "Design & sizing advice" },
];

export function ServiceRequestForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    serviceType: "residential" as ServiceType,
    message: "",
  });
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-brand-800">
          Request received!
        </h3>
        <p className="mt-2 text-sm text-brand-700">
          Our team will call you within 24 hours to schedule a site survey.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            required
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Phone / WhatsApp *</label>
          <input
            required
            className={inputClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Location *</label>
          <input
            required
            className={inputClass}
            placeholder="City / Area"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Service Type *</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <label
              key={s.id}
              className={`cursor-pointer rounded-lg border p-3 ${
                form.serviceType === s.id
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="serviceType"
                checked={form.serviceType === s.id}
                onChange={() => update("serviceType", s.id)}
                className="mr-2"
              />
              <span className="font-medium text-sm text-gray-900">{s.label}</span>
              <span className="block text-xs text-gray-500">{s.desc}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={labelClass}>Project Details</label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Describe your power needs, appliances, or existing setup…"
        />
      </div>

      {state === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "Book a Free Site Survey"}
      </button>
    </form>
  );
}
