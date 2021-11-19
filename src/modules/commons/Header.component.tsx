import React, { useCallback } from "react";
import Container from "./Container.component";
import Logo from "./Logo.component";

const Header: React.FC = () => {
  // to do
  const isLogged = true;

  const handleLogout = useCallback(() => null, []);

  return (
    <header className="bg-black flex flex-row w-full">
      <Container className="py-36 flex flex-row justify-between items-center">
        <Logo />
        {isLogged && (
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
