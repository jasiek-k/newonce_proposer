import React, { useEffect } from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";
import { useRecoilValue } from "recoil";
import { userState } from "../login/Login.state";
import { HOME_ROUTE } from "../../config/config";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const { push } = useHistory();

  const user = useRecoilValue(userState);

  console.log(user);

  useEffect(() => {
    if (!user) {
      push(HOME_ROUTE);
    }
  }, [push, user]);

  return (
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
          <div className="w-1/3">
            <h2 className="font-primary text-32 font-black">{user.name}</h2>
            <span className="font-primary text-18">{user.email}</span>
          </div>
          <div className="w-2/3">
            <Button caption="Utwórz nową"/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
