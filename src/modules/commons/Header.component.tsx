import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../login/Login.state";
import Container from "./Container.component";
import Logo from "./Logo.component";

const Header: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = useCallback(() => setUser(null), []);

  return (
    <header className="bg-black flex flex-row w-full">
      <Container className="py-36 flex flex-row justify-between items-center">
        <Logo />
        {!!user && (
          <button type="button" onClick={handleLogout}>
            <span className="text-white font-secondary text-14 font-bold">
              WYLOGUJ
            </span>
          </button>
        )}
      </Container>
    </header>
  );
};

export default Header;
