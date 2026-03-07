import "dotenv/config";
import prisma from "../src/lib/db.js";
import bcrypt from "bcrypt";

async function main() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@fajr.com";

  // Vérifie s'il existe déjà
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingAdmin) {
    const defaultPassword =
      process.env.SUPER_ADMIN_PASSWORD || "SuperAdminPassword123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    await prisma.admin.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        name: "Super Administrateur",
        role: "SUPER_ADMIN",
      },
    });
    console.log(
      `✅ Super Admin créé avec succès. Email: ${superAdminEmail} | Mdp: ${defaultPassword}`,
    );
  } else {
    console.log(`ℹ️ Le Super Admin existe déjà.`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors de l'initialisation:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
