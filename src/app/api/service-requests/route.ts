import { NextRequest, NextResponse } from "next/server";
import {
  createServiceRequest,
  generateServiceRequestId,
  listServiceRequests,
} from "@/lib/serviceRequests";
import { requireAdmin } from "@/lib/admin";
import type { ServiceType } from "@/lib/types";

const VALID_TYPES: ServiceType[] = [
  "residential",
  "commercial",
  "maintenance",
  "consultation",
];

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requests = await listServiceRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    phone?: string;
    email?: string;
    location?: string;
    serviceType?: string;
    message?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.phone || !body.location || !body.serviceType) {
    return NextResponse.json(
      { error: "Name, phone, location and service type are required" },
      { status: 400 }
    );
  }
  if (!VALID_TYPES.includes(body.serviceType as ServiceType)) {
    return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
  }

  const requestRecord = await createServiceRequest({
    id: generateServiceRequestId(),
    createdAt: new Date().toISOString(),
    name: body.name,
    phone: body.phone,
    email: body.email || "",
    location: body.location,
    serviceType: body.serviceType as ServiceType,
    message: body.message || "",
  });

  return NextResponse.json({ request: requestRecord }, { status: 201 });
}
