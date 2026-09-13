import { cookies } from "next/headers";

const ADMIN_COOKIE = "nb_admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "nibot123";
}

export function isAdminSession(value: string | undefined): boolean {
  if (!value) return false;
  return value === getAdminPassword();
}

export async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const session = store.get(ADMIN_COOKIE)?.value;
  return isAdminSession(session);
}
