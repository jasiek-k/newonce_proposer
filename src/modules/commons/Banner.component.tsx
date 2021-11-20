import React from "react";
import Container from "./Container.component";

const commonCaption = (
  <>
    <h1 className="text-32 mb-4 font-primary font-black">PLAYLIST PROPOSER</h1>
    <h2 className="text-16 font-primary font-black">
      Nie masz pomysłu co puścić? Zajmiemy się tym za Ciebie
    </h2>
  </>
);

const Banner: React.FC = ({ children = commonCaption }) => (
  <Container className="bg-blue lg:py-48 text-white">{children}</Container>
);

export default Banner;
