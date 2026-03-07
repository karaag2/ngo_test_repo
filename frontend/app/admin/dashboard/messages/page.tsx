import MessagesPanelClient from "@/src/components/admin/dashboard/MessagesPanelClient";
import { getServerContacts } from "@/src/services/server.service";

export default async function MessagesPage() {
  const paginatedData = await getServerContacts();
  return <MessagesPanelClient initialData={paginatedData} />;
}
