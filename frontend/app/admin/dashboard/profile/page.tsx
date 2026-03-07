import ProfilePanelClient from "@/src/components/admin/dashboard/ProfilePanelClient";
import { getServerAdminProfile } from "@/src/services/server.service";

export default async function ProfilePage() {
  const profile = await getServerAdminProfile();
  return <ProfilePanelClient initialProfile={profile} />;
}
