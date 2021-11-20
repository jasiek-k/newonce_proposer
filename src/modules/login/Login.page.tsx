import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import Banner from "../commons/Banner.component";
import Container from "../commons/Container.component";
import Header from "../commons/Header.component";
import { useHistory } from "react-router-dom";
import Input from "../commons/Input.component";
import Button from "../commons/Button.component";
import { PROFILE_ROUTE, REGISTER_ROUTE } from "../../config/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "./Login.state";

const Login: React.FC = () => {
  const auth = getAuth();
  const { push } = useHistory();
  const [user, setUser] = useRecoilState(userState);

  const submit = async (value: any) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      setUser(res.user);
      push(PROFILE_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      push("/profile");
    }
  }, [push, user]);

  return (
    <div>
      <Header />
      <Banner />
      <Container>
        <div className="mx-auto w-full md:w-360">
          <h1 className="mt-50 text-38 mb-36 font-primary font-black">
            ZALOGUJ SIĘ
          </h1>
          <Formik initialValues={{ email: "", password: "" }} onSubmit={submit}>
            {() => (
              <Form className="flex flex-col">
                <Input name="email" placeholder="E-mail" className="mb-30 " />
                <Input
                  name="password"
                  type="password"
                  placeholder="Hasło"
                  className="mb-40"
                />
                <Button type="submit" caption="zaloguj" className="w-full" />
                <a
                  href={REGISTER_ROUTE}
                  className="underline mt-20 mx-auto font-secondary text-14"
                >
                  Nie masz konta? Zarejestruj się
                </a>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default Login;
