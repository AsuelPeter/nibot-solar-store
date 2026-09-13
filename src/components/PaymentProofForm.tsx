"use client";

import { useState } from "react";
import { formatNaira } from "@/lib/products";
import { getBankDetails } from "@/lib/payment";

export function PaymentProofForm({
  orderId,
  total,
}: {
  orderId: string;
  total: number;
}) {
  const bank = getBankDetails();
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");

    try {
      const fileInput = document.getElementById(
        "receipt-file"
      ) as HTMLInputElement | null;
      const file = fileInput?.files?.[0];

      let receiptImage: string | undefined;
      if (file) {
        const reader = new FileReader();
        receiptImage = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Could not read file"));
          reader.readAsDataURL(file);
        });
      }

      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferReference: reference, receiptImage }),
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
      <div className="rounded-lg bg-brand-50 p-4 text-sm text-brand-800">
        <p className="font-semibold">Payment details received ✓</p>
        <p className="mt-1">
          We&apos;ll verify your transfer and confirm your order.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="rounded-lg bg-gray-50 p-4 text-sm">
        <p className="font-medium text-gray-900">
          Transfer {formatNaira(total)} to:
        </p>
        <div className="mt-2 space-y-1">
          <p>
            <span className="text-gray-500">Bank:</span>{" "}
            <span className="font-semibold">{bank.bankName}</span>
          </p>
          <p>
            <span className="text-gray-500">Account Name:</span>{" "}
            <span className="font-semibold">{bank.accountName}</span>
          </p>
          <p>
            <span className="text-gray-500">Account Number:</span>{" "}
            <span className="font-semibold">{bank.accountNumber}</span>
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transfer Reference
        </label>
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
          placeholder="e.g. Session ID / ref from your bank app"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Receipt (optional)
        </label>
        <input
          id="receipt-file"
          type="file"
          accept="image/*,.pdf"
          onChange={onFile}
          className="w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        {fileName && (
          <p className="mt-1 text-xs text-gray-500">Selected: {fileName}</p>
        )}
      </div>

      {state === "error" && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting…" : "I've Made the Transfer"}
      </button>
    </form>
  );
}
