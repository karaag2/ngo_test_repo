import React from "react";
import Hero from "@/src/components/sections/hero";
import Cause from "@/src/components/sections/cause";
import Stats from "@/src/components/sections/Stats";
import Map from "@/src/components/sections/MapSection";
import Donation from "@/src/components/sections/Donation";
import Temoignages from "@/src/components/sections/Temoignages";
import Footer from "@/src/components/sections/Footer";
import Gallery from "@/src/components/sections/Gallery";
import Contact from "@/src/components/sections/Contact";

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
