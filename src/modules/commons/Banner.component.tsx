import React from "react";
import Container from "./Container.component";

const Banner: React.FC = ({ children }) => (
  <Container className="bg-blue lg:py-48 text-white">{children}</Container>
);

export default Banner;
