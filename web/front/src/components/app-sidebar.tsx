import { validateRequest } from "@/lib/lucia";
import type { DatabaseUserAttributes } from "@/lib/lucia";
import { ClientSidebar } from "./dashboard/sidebar";

export async function AppSidebar() {
  const { user } = await validateRequest();
  
  if (!user) return null;

  return <ClientSidebar user={user} />;
}
