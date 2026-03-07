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

  // Nettoyage optionnel si vous voulez forcer le nouveau seed (décommentez si besoin)
  // await prisma.activity.deleteMany({});

  const blogCount = await prisma.activity.count();
  if (blogCount === 0 || blogCount <= 2) {
    // On force si c'est le vieux seed
    if (blogCount > 0) await prisma.activity.deleteMany({});

    const defaultPosts = [
      {
        slug: "distribution-de-kits",
        title: "Distribution de kits scolaires au Nord",
        category: "Éducation",
        imageUrl:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
        description:
          "Notre équipe a distribué plus de 500 kits scolaires pour la rentrée, assurant un avenir meilleur aux enfants.",
        content: `
          <p>L'éducation est le fondement de toute société prospère. C'est pourquoi FJ s'engage chaque année à soutenir les familles les plus vulnérables lors de la rentrée scolaire.</p>
          <p>Cette année, notre déploiement dans le Nord a permis de toucher 523 enfants. Chaque kit contient des cahiers, des stylos, un sac à dos et le matériel de géométrie nécessaire.</p>
          <h3>Impact immédiat</h3>
          <p>Grâce à vos dons, nous avons réduit le taux d'absentéisme de 15% dans les zones d'intervention. Les enseignants rapportent une motivation accrue chez les élèves qui disposent désormais de leurs propres outils de travail.</p>
        `,
        createdById: admin.id,
      },
      {
        slug: "construction-decole",
        title: "Inauguration de la nouvelle école de brousse",
        category: "Infrastructure",
        imageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
        description:
          "Une structure moderne pour accueillir 120 élèves dans des conditions d'apprentissage optimales.",
        content: `
          <p>Après six mois de travaux acharnés, nous sommes fiers de présenter le nouveau complexe scolaire de Fajr. Autrefois, les enfants devaient parcourir 10km pour rejoindre le centre le plus proche.</p>
          <p>L'école dispose de 4 salles de classe, d'un bloc sanitaire et d'un espace de jeu sécurisé.</p>
          <h3>Développement durable</h3>
          <p>Le bâtiment a été construit avec des matériaux locaux pour garantir une isolation naturelle efficace contre la chaleur intense de la région.</p>
        `,
        createdById: admin.id,
      },
      {
        slug: "formation-pedagogique",
        title: "Formation intensive pour nos éducateurs",
        category: "Savoir-faire",
        imageUrl:
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
        description:
          "Renforcement des capacités pédagogiques pour une éducation de qualité supérieure.",
        content: `
          <p>Donner des outils est une chose, savoir les utiliser en est une autre. Notre programme de formation continue vise à professionnaliser l'enseignement en zone rurale.</p>
          <p>Vingt enseignants ont participé à ce séminaire axé sur les nouvelles méthodes de pédagogie active et l'utilisation du numérique en classe.</p>
        `,
        createdById: admin.id,
      },
      {
        slug: "acces-a-leau",
        title: "L'eau potable arrive enfin au village",
        category: "Vie Quotidienne",
        imageUrl:
          "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
        description:
          "Installation de nouveaux forages solaires pour un accès permanent à l'eau potable.",
        content: `
          <p>Sans eau, il n'y a pas de vie. FJ a finalisé l'installation d'un forage solaire de grande capacité.</p>
          <p>Cela réduit considérablement la charge de travail des femmes et des enfants qui passaient des heures à chercher de l'eau loin du domicile.</p>
        `,
        createdById: admin.id,
      },
      {
        slug: "consultation-medicale",
        title: "Clinique mobile : Mission Santé 2026",
        category: "Santé",
        imageUrl:
          "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2064&auto=format&fit=crop",
        description:
          "Une semaine de soins gratuits pour les populations isolées.",
        content: `
          <p>La santé est un droit, pas un privilège. Notre clinique mobile a parcouru 300km pour offrir des soins pédiatriques et généraux.</p>
          <p>Plus de 200 consultations ont été effectuées durant cette mission éclair.</p>
        `,
        createdById: admin.id,
      },
    ];

    for (const post of defaultPosts) {
      await prisma.activity.create({ data: post });
    }
    console.log("✅ Articles de blog mis à jour créés.");
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
      {
        title: "Eau & Assainissement",
        description: "Construction de forages et sensibilisation à l'hygiène.",
        icon: "Droplet",
        order: 3,
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
