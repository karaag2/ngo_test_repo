export type EtablissementType =
  | "École primaire"
  | "Collège"
  | "Lycée technique"
  | "Centre de formation"

export interface Location {
  id: number
  name: string
  short: string
  lng: number
  lat: number
  ville: string
  region: string
  type: EtablissementType
  ouverture: number
  eleves: number
  description: string
  services: string[]
}

export const locations: Location[] = [
  {
    id: 1,
    name: "École Primaire Lumière – Niamey Plateau",
    short: "EP Lumière Niamey",
    lng: 2.1148,
    lat: 13.5137,
    ville: "Niamey",
    region: "Niamey",
    type: "École primaire",
    ouverture: 2018,
    eleves: 320,
    description:
      "Premier établissement fondé par l'ONG, implanté dans le quartier Plateau. Accueille 320 élèves du CP au CM2 avec un programme renforcé en lecture et mathématiques.",
    services: ["Cantine scolaire", "Bibliothèque", "Soutien scolaire"],
  },
  {
    id: 2,
    name: "Centre de Formation Professionnelle – Agadez",
    short: "CFP Agadez",
    lng: 7.9889,
    lat: 16.9667,
    ville: "Agadez",
    region: "Agadez",
    type: "Centre de formation",
    ouverture: 2019,
    eleves: 145,
    description:
      "Centre spécialisé dans les métiers du bâtiment, de l'artisanat touareg et de l'énergie solaire. Répond aux besoins économiques spécifiques de la région saharienne.",
    services: ["Atelier solaire", "Forge & artisanat", "Certification ANPE"],
  },
  {
    id: 3,
    name: "Collège Rural Sahel – Filingué",
    short: "Collège Sahel Filingué",
    lng: 3.3167,
    lat: 14.35,
    ville: "Filingué",
    region: "Tillabéri",
    type: "Collège",
    ouverture: 2020,
    eleves: 210,
    description:
      "Collège de proximité desservant 12 villages environnants. Offre un internat pour les élèves des zones rurales éloignées de plus de 15 km.",
    services: ["Internat mixte", "Transport scolaire", "Bibliothèque numérique"],
  },
  {
    id: 4,
    name: "École Primaire Espoir – Gaya",
    short: "EP Espoir Gaya",
    lng: 3.4469,
    lat: 11.8833,
    ville: "Gaya",
    region: "Dosso",
    type: "École primaire",
    ouverture: 2019,
    eleves: 285,
    description:
      "Située à la frontière avec le Bénin et le Nigeria, cette école accueille aussi des enfants de familles déplacées. Programme bilingue français-haoussa.",
    services: ["Programme bilingue", "Santé scolaire", "Cantine"],
  },
  {
    id: 5,
    name: "Lycée Technique Lumière – Maradi",
    short: "LT Lumière Maradi",
    lng: 7.1008,
    lat: 13.4925,
    ville: "Maradi",
    region: "Maradi",
    type: "Lycée technique",
    ouverture: 2021,
    eleves: 390,
    description:
      "Premier lycée technique de l'ONG, avec des filières en informatique, comptabilité et agroalimentaire. Partenariat avec des entreprises locales pour les stages.",
    services: ["Labo informatique", "Filière agroalimentaire", "Stages entreprises"],
  },
  {
    id: 6,
    name: "Centre d'Alphabétisation – Birni-N'Konni",
    short: "CA Birni-N'Konni",
    lng: 5.2667,
    lat: 13.8,
    ville: "Birni-N'Konni",
    region: "Tahoua",
    type: "Centre de formation",
    ouverture: 2020,
    eleves: 180,
    description:
      "Centre dédié à l'alphabétisation des adultes et à la formation des jeunes filles déscolarisées. Programme spécial pour les femmes rurales.",
    services: ["Alphabétisation adultes", "Couture & broderie", "Micro-finance"],
  },
  {
    id: 7,
    name: "École Primaire Al-Nour – Zinder",
    short: "EP Al-Nour Zinder",
    lng: 8.9881,
    lat: 13.8,
    ville: "Zinder",
    region: "Zinder",
    type: "École primaire",
    ouverture: 2018,
    eleves: 410,
    description:
      "L'une des plus grandes écoles de l'ONG, construite dans un quartier périphérique de Zinder. Intègre un module d'éducation civique et environnementale.",
    services: ["Jardin pédagogique", "Club environnement", "Bibliothèque"],
  },
  {
    id: 8,
    name: "Collège Mixte Avenir – Diffa",
    short: "Collège Avenir Diffa",
    lng: 12.6113,
    lat: 13.3155,
    ville: "Diffa",
    region: "Diffa",
    type: "Collège",
    ouverture: 2022,
    eleves: 165,
    description:
      "Établissement construit dans une zone affectée par les crises du lac Tchad. Priorité aux enfants réfugiés et déplacés internes avec un soutien psychosocial intégré.",
    services: ["Soutien psychosocial", "Rations alimentaires", "Classes de rattrapage"],
  },
  {
    id: 9,
    name: "Centre Polyvalent Lumière – Arlit",
    short: "CP Lumière Arlit",
    lng: 7.3853,
    lat: 18.7369,
    ville: "Arlit",
    region: "Agadez",
    type: "Centre de formation",
    ouverture: 2023,
    eleves: 120,
    description:
      "Centre le plus récent de l'ONG, implanté dans la ville minière d'Arlit. Forme les jeunes aux métiers techniques liés à l'industrie et à la maintenance.",
    services: ["Mécanique industrielle", "Électricité", "Sécurité & HSE"],
  },
]