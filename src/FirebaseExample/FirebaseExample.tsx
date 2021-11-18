import { FormEvent, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function FirebaseExample() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const auth = getAuth();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log("Zalogowano. User:");
        console.log(userCredential.user);
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log("Zarejestrowano. User:");
        console.log(userCredential.user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "120px" }}>
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
    </div>
  );
}
