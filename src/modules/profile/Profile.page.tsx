import React, { useEffect } from "react";
import Container from "../commons/Container.component";
import Banner from "../commons/Banner.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";
import { useRecoilValue } from "recoil";
import { userState } from "../login/Login.state";
import { HOME_ROUTE, GENERATOR_ROUTE } from "../../config/config";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const { push } = useHistory();

  const user = useRecoilValue(userState);

  const handleCreatePlaylist = () => {
    push(GENERATOR_ROUTE);
  };

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
          <div className="flex flex-row pt-50">
            <div className="">{user.email}</div>
            <div>
              <Button caption="utwórz nową" onClick={handleCreatePlaylist} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profile;
