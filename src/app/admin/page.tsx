import { requireAdmin } from "@/lib/admin";
import { AdminPanel } from "@/components/AdminPanel";

export default async function AdminPage() {
  const authed = await requireAdmin();
  return <AdminPanel initialAuthed={authed} />;
}
