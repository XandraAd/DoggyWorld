import Types from "../../components/Types";
import HeroSection from "../../components/HeroSection";
import WhatWeOffer from "../../components/WhatWeOffer"

import PetsAvailable from "../../components/PetsAvailable";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <WhatWeOffer />
      <Types />
      <PetsAvailable/>
    </>
  );
};

export default Landing;