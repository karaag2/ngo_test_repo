import React from "react";
import Hero from "@/src/components/sections/hero";
import Cause from "@/src/components/sections/cause";
import Stats from "@/src/components/sections/Stats";
import Map from "@/src/components/sections/MapSection";
import Donation from "@/src/components/sections/Donation";
import Temoignages from "@/src/components/sections/Temoignages";
const page = () => {
  return (
    <div className="min-h-full inset-0">
      <Hero />
      <Cause />
      <Stats />
      <Map />
      <Donation/>
      <Temoignages/>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  );
};

export default page;
