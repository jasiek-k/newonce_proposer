import React, { useEffect } from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";
import { useRecoilValue } from "recoil";
import { userState } from "../login/Login.state";
import { GENERATOR_ROUTE, HOME_ROUTE } from "../../config/config";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const { push } = useHistory();

  const user = useRecoilValue(userState);

  const handleCreatePlaylist = () => {
    push(GENERATOR_ROUTE);
  };

  console.log(user);

  useEffect(() => {
    if (!user) {
      push(HOME_ROUTE);
    }
  }, [push, user]);

  return (
    <div>
      <Header />
      <Banner />
      <Container>
        {user && (
          <div className="w-full">
            <div style={{ width: "66.66%" }} className="flex flex-col mx-auto">
              <h2 className="font-primary text-18 text-gray font-black py-30">
                {user.email}
              </h2>
              <div className="flex flex-row items-center justify-between">
                <h1 className="uppercase font-primary text-38 font-black">
                  Twoje playlisty
                </h1>
                <Button
                  style={{ width: "37.5%" }}
                  caption="utwórz nową"
                  onClick={handleCreatePlaylist}
                />
              </div>
              <h2 className="my-80 font-primary text-22 font-black">
                Jeszcze niczego z nami nie słuchałeś :C
                <br />
                Utwórz swoją pierwszą playliste
              </h2>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
