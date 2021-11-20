import { FormEvent, useState } from "react";

import {
  createProfile,
  loginProfile,
  getCurrentUser,
  getUserPlaylists,
  getPlaylistTracks,
} from "../utils/firestore";

export default function FirebaseExample() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const currentUser = getCurrentUser();
  const userPlaylists = currentUser && getUserPlaylists(currentUser.uid);


  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginProfile(loginEmail, loginPassword);
    userPlaylists?.then((data) => {
      data.forEach((item) => console.log(item.data()));
    });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProfile(registerEmail, registerPassword);
  };

  return (
    <div>
      <h3>Firebase Login</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="example-email">E-mail:</label>
        <input
          id="example-email"
          type="email"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <label htmlFor="example-password">Haslo:</label>
        <input
          id="example-password"
          type="password"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button type="submit">Zaloguj</button>
      </form>
      <hr />
      <h3>Firebase Register</h3>
      <form onSubmit={handleRegister}>
        <label htmlFor="example-email-register">E-mail:</label>
        <input
          id="example-email-register"
          type="email"
          required
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />

        <label htmlFor="example-password-register">Haslo:</label>
        <input
          id="example-password-register"
          type="password"
          required
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <button type="submit">Zarejestruj</button>
      </form>
      <div>
        <hr />
        <h2>{`Current User: ${currentUser?.email}`}</h2>
        <hr />
      </div>
      <hr />
    </div>
  );
}
