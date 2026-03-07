import "dotenv/config";
import prisma, { disconnectDB } from "../src/lib/db.ts";
import bcrypt from "bcrypt";

async function main() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@fajr.com";

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: superAdminEmail },
  });

  let admin;
  if (!existingAdmin) {
    const defaultPassword =
      process.env.SUPER_ADMIN_PASSWORD || "SuperAdminPassword123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    admin = await prisma.admin.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        name: "Super Administrateur",
        role: "SUPER_ADMIN",
      },
    });
    console.log(`✅ Super Admin créé: ${superAdminEmail}`);
  } else {
    admin = existingAdmin;
    console.log(`ℹ️ Le Super Admin existe déjà.`);
  }

  const blogCount = await prisma.activity.count();
  if (blogCount === 0) {
    const defaultPosts = [
      {
        slug: "distribution-de-kits",
        title: "Distribution de kits scolaires au Nord",
        category: "Éducation",
        imageUrl:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
        description:
          "Notre équipe a distribué plus de 500 kits scolaires pour la rentrée scolaire.",
        content:
          "<p>L'éducation est le fondement de toute société prospère...</p>",
        createdById: admin.id,
      },
      {
        slug: "construction-decole",
        title: "Inauguration de la nouvelle école de brousse",
        category: "Infrastructure",
        imageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
        description:
          "Une structure moderne pour accueillir 120 élèves dans des conditions optimales.",
        content: "<p>Après six mois de travaux acharnés...</p>",
        createdById: admin.id,
      },
    ];

    for (const post of defaultPosts) {
      await prisma.activity.create({ data: post });
    }
    console.log("✅ Articles de blog initiaux créés.");
  }

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    const defaultServices = [
      {
        title: "Scolarisation",
        description:
          "Programmes d'accès à l'école pour les enfants en zones rurales.",
        icon: "GraduationCap",
        order: 1,
        createdById: admin.id,
      },
      {
        title: "Santé Mobile",
        description:
          "Cliniques mobiles pour fournir des soins de base aux populations isolées.",
        icon: "Heart",
        order: 2,
        createdById: admin.id,
      },
    ];

    for (const service of defaultServices) {
      await prisma.service.create({ data: service });
    }
    console.log("✅ Services initiaux créés.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors de l'initialisation:", e);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDB();
  });
