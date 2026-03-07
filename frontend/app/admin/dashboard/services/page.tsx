import ServicesPanelClient from "@/src/components/admin/dashboard/ServicesPanelClient";
import { getServerServices } from "@/src/services/server.service";

export default async function ServicesPage() {
  const paginatedData = await getServerServices();
  return <ServicesPanelClient initialData={paginatedData} />;
}
