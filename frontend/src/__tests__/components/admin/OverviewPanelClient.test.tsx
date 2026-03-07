import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/src/__tests__/test-utils";
import OverviewPanelClient from "@/src/components/admin/dashboard/OverviewPanelClient";

describe("OverviewPanelClient (Dashboard Admin)", () => {
  const mockActivities = [
    {
      id: 1,
      title: "Activité Test",
      description: "Description",
      category: "Sante",
      createdAt: new Date().toISOString(),
    },
  ];

  const mockContacts = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      message: "Test message",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const mockAdmin: any = {
    id: "admin-1",
    name: "Amos",
    role: "SUPER_ADMIN",
  };

  it("affiche les statistiques (Activités, Services, Messages)", () => {
    render(
      <OverviewPanelClient
        initialActivities={mockActivities}
        initialContacts={mockContacts}
        adminProfile={mockAdmin}
      />,
    );

    expect(screen.getByText("Activités")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("affiche le bouton 'Créer un administrateur' pour un SUPER_ADMIN", () => {
    render(
      <OverviewPanelClient
        initialActivities={mockActivities}
        initialContacts={mockContacts}
        adminProfile={mockAdmin}
      />,
    );

    expect(screen.getByText("Créer un administrateur")).toBeInTheDocument();
  });

  it("ne doit pas afficher le bouton pour un simple ADMIN", () => {
    const simpleAdmin = { ...mockAdmin, role: "ADMIN" };
    render(
      <OverviewPanelClient
        initialActivities={mockActivities}
        initialContacts={mockContacts}
        adminProfile={simpleAdmin}
      />,
    );

    expect(
      screen.queryByText("Créer un administrateur"),
    ).not.toBeInTheDocument();
  });

  it("affiche la liste des activités récentes", () => {
    render(
      <OverviewPanelClient
        initialActivities={mockActivities}
        initialContacts={mockContacts}
        adminProfile={mockAdmin}
      />,
    );

    expect(screen.getByText("Activité Test")).toBeInTheDocument();
  });
});
