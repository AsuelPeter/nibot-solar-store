import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getOrder, updateOrderPayment } from "@/lib/orders";
import { requireAdmin } from "@/lib/admin";
import type { PaymentStatus } from "@/lib/types";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "receipts");

const MIME_EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

async function saveReceipt(
  orderId: string,
  dataUrl: string
): Promise<string> {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image data");
  const mime = match[1];
  const ext = MIME_EXT[mime];
  if (!ext) throw new Error("Unsupported file type");
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 5 * 1024 * 1024) throw new Error("File too large");

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${orderId}.${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/receipts/${filename}`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: { transferReference?: string; receiptImage?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const transferReference = (body.transferReference || "").trim();

  let receiptImage: string | undefined;
  if (body.receiptImage && body.receiptImage.startsWith("data:")) {
    try {
      receiptImage = await saveReceipt(id, body.receiptImage);
    } catch {
      return NextResponse.json(
        { error: "Could not save receipt" },
        { status: 400 }
      );
    }
  }

  const updated = await updateOrderPayment(id, {
    transferReference: transferReference || undefined,
    receiptImage: receiptImage || order.receiptImage,
  });

  return NextResponse.json({ order: updated });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: { paymentStatus?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body.paymentStatus !== "paid" && body.paymentStatus !== "pending") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const updated = await updateOrderPayment(id, {
    paymentStatus: body.paymentStatus as PaymentStatus,
  });
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ order: updated });
}
