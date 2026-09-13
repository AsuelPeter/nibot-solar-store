import { promises as fs } from "fs";
import path from "path";
import type { ServiceRequest } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "service-requests.json");

async function read(): Promise<ServiceRequest[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw) as ServiceRequest[];
  } catch {
    return [];
  }
}

async function write(requests: ServiceRequest[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(requests, null, 2), "utf-8");
}

export async function listServiceRequests(): Promise<ServiceRequest[]> {
  const requests = await read();
  return requests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createServiceRequest(
  request: ServiceRequest
): Promise<ServiceRequest> {
  const requests = await read();
  requests.push(request);
  await write(requests);
  return request;
}

export function generateServiceRequestId(): string {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SR-${stamp}-${rand}`;
}
