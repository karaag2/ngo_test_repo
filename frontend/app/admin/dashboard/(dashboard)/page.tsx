import OverviewPanelClient from "@/src/components/admin/dashboard/OverviewPanelClient";
import {
  getServerActivities,
  getServerContacts,
  getServerAdminProfile,
} from "@/src/services/server.service";

export default async function DashboardPage() {
  const [activitiesData, contactsData, adminProfile] = await Promise.all([
    getServerActivities(),
    getServerContacts(),
    getServerAdminProfile(),
  ]);

  return (
    <OverviewPanelClient
      initialActivities={activitiesData.data}
      initialContacts={contactsData.data}
      adminProfile={adminProfile}
    />
  );
}
