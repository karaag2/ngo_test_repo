import { BlogPost } from "@/src/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "distribution-de-kits",
    title: "Distribution de kits scolaires au Nord",
    category: "Éducation",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "Notre équipe a distribué plus de 500 kits scolaires pour la rentrée, assurant un avenir meilleur aux enfants.",
    content: `
      <p>L'éducation est le fondement de toute société prospère. C'est pourquoi MKRT s'engage chaque année à soutenir les familles les plus vulnérables lors de la rentrée scolaire.</p>
      <p>Cette année, notre déploiement dans le Nord a permis de toucher 523 enfants. Chaque kit contient des cahiers, des stylos, un sac à dos et le matériel de géométrie nécessaire.</p>
      <h3>Impact immédiat</h3>
      <p>Grâce à vos dons, nous avons réduit le taux d'absentéisme de 15% dans les zones d'intervention. Les enseignants rapportent une motivation accrue chez les élèves qui disposent désormais de leurs propres outils de travail.</p>
    `,
    date: "24 Fév 2026",
    author: "Fatou Diallo",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "construction-decole",
    title: "Inauguration de la nouvelle école de brousse",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
    excerpt:
      "Une structure moderne pour accueillir 120 élèves dans des conditions d'apprentissage optimales.",
    content: `
      <p>Après six mois de travaux acharnés, nous sommes fiers de présenter le nouveau complexe scolaire de Makaranta. Autrefois, les enfants devaient parcourir 10km pour rejoindre le centre le plus proche.</p>
      <p>L'école dispose de 4 salles de classe, d'un bloc sanitaire et d'un espace de jeu sécurisé.</p>
      <h3>Développement durable</h3>
      <p>Le bâtiment a été construit avec des matériaux locaux pour garantir une isolation naturelle efficace contre la chaleur intense de la région.</p>
    `,
    date: "15 Jan 2026",
    author: "Moussa Soro",
    readTime: "8 min",
  },
  {
    id: "3",
    slug: "formation-pedagogique",
    title: "Formation intensive pour nos éducateurs",
    category: "Savoir-faire",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "Renforcement des capacités pédagogiques pour une éducation de qualité supérieure.",
    content: `
      <p>Donner des outils est une chose, savoir les utiliser en est une autre. Notre programme de formation continue vise à professionnaliser l'enseignement en zone rurale.</p>
      <p>Vingt enseignants ont participé à ce séminaire axé sur les nouvelles méthodes de pédagogie active et l'utilisation du numérique en classe.</p>
    `,
    date: "10 Fév 2026",
    author: "Aminata Traoré",
    readTime: "6 min",
  },
  {
    id: "4",
    slug: "acces-a-leau",
    title: "L'eau potable arrive enfin au village",
    category: "Vie Quotidienne",
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
    excerpt:
      "Installation de nouveaux forages solaires pour un accès permanent à l'eau potable.",
    content: `
      <p>Sans eau, il n'y a pas de vie. MKRT a finalisé l'installation d'un forage solaire de grande capacité.</p>
      <p>Cela réduit considérablement la charge de travail des femmes et des enfants qui passaient des heures à chercher de l'eau loin du domicile.</p>
    `,
    date: "05 Jan 2026",
    author: "Jean Dupont",
    readTime: "7 min",
  },
  {
    id: "5",
    slug: "consultation-medicale",
    title: "Clinique mobile : Mission Santé 2026",
    category: "Santé",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2064&auto=format&fit=crop",
    excerpt: "Une semaine de soins gratuits pour les populations isolées.",
    content: `
      <p>La santé est un droit, pas un privilège. Notre clinique mobile a parcouru 300km pour offrir des soins pédiatriques et généraux.</p>
      <p>Plus de 200 consultations ont été effectuées durant cette mission éclair.</p>
    `,
    date: "01 Fév 2026",
    author: "Dr. Koné",
    readTime: "10 min",
  },
];
