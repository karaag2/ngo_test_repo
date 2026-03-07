import ActivitiesPanelClient from "@/src/components/admin/dashboard/ActivitiesPanelClient";
import { getServerActivities } from "@/src/services/server.service";

export default async function ActivitiesPage() {
  const paginatedData = await getServerActivities();
  return <ActivitiesPanelClient initialData={paginatedData} />;
}
