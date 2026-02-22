import React from "react";
import Hero from "@/src/components/sections/hero";
import Cause from "@/src/components/sections/cause";
import Stats from "@/src/components/sections/Stats";
const page = () => {
  return (
    <div className="min-h-full inset-0">
      <Hero />
      <Cause />
      <Stats />
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
