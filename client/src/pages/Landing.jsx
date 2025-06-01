import React from "react";


import Types from "../components/Types";
import HeroSection from "../components/HeroSection";
import WhatWeOffer from "../components/WhatWeOffer"

const Landing = () => {
  return (
    <>
      <HeroSection />
      <WhatWeOffer />
      <Types />
    </>
  );
};

export default Landing;