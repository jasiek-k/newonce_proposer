import React from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";

const Profile: React.FC = () => (
  <div>
    <Header />
    <Banner>
      <h1 className="text-32 mb-4 font-primary font-black">
        PLAYLIST PROPOSER
      </h1>
      <h2 className="text-16 font-primary font-black">
        Nie masz pomysłu co puścić? Zajmiemy się tym za Ciebie
      </h2>
    </Banner>

    <Container>
      <div className="flex flex-row pt-50">
        <div className=""></div>
        <div>
          <Button caption="utwórz nową" />
        </div>
      </div>
    </Container>
  </div>
);

export default Profile;
