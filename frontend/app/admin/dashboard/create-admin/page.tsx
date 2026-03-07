import CreateAdminClient from "@/src/components/admin/dashboard/CreateAdminClient";
import { getServerAdminProfile } from "@/src/services/server.service";
import { redirect } from "next/navigation";

export default async function CreateAdminPage() {
  const profile = await getServerAdminProfile();

  if (!profile || profile.role !== "SUPER_ADMIN") {
    redirect("/admin/dashboard");
  }

  return <CreateAdminClient />;
}
