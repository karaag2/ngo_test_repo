import Hero from "@/src/components/sections/Hero";
import Cause from "@/src/components/sections/Cause";
import Stats from "@/src/components/sections/Stats";
import Contact from "@/src/components/sections/Contact";
import dynamic from "next/dynamic";

/* ── Below-the-fold sections : lazy-loaded to cut TBT ── */
const Map = dynamic(() => import("@/src/components/sections/MapSection"), {
  loading: () => (
    <section className="container mx-auto px-6 py-24 min-h-[600px]" />
  ),
});

const Gallery = dynamic(() => import("@/src/components/sections/Gallery"), {
  loading: () => (
    <section className="container mx-auto px-6 py-24 min-h-[600px]" />
  ),
});

const Donation = dynamic(() => import("@/src/components/sections/Donation"), {
  loading: () => (
    <section className="container mx-auto px-6 py-24 min-h-[400px]" />
  ),
});

const Temoignages = dynamic(
  () => import("@/src/components/sections/Temoignages"),
  {
    loading: () => (
      <section className="container mx-auto px-6 py-24 min-h-[400px]" />
    ),
  },
);


const page = () => {
  return (
    <div className="min-h-full inset-0">
      <Hero />
      <Cause />
      <Stats />
      <Map />
      <Gallery />
      <Donation />
      <Temoignages />
      <Contact />
    </div>
  );
};

export default page;
