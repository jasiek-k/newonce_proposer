import React from "react";
import { Form, Formik } from "formik";
import Banner from "../commons/Banner.component";
import Container from "../commons/Container.component";
import Input from "../commons/Input.component";
import Button from "../commons/Button.component";
import Header from "../commons/Header.component";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE } from "../../config/config";

import { createProfile } from "../../utils/firestore";

const Register: React.FC = () => {
  const { push } = useHistory();

  const submit = async (value: any) => {
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      push(HOME_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header />
      <Banner />
      <Container>
        <div className="mx-auto w-full md:w-360">
          <h1 className="mt-50 text-38 mb-36 font-primary font-black">
            UTWÓRZ KONTO
          </h1>
          <Formik initialValues={{ email: "", password: "" }} onSubmit={submit}>
            {() => (
              <Form className="flex flex-col">
                <Input name="email" placeholder="E-mail" className="mb-30 " />
                <Input
                  name="password"
                  placeholder="Hasło"
                  type="password"
                  className="mb-40"
                />
                <Button
                  type="submit"
                  caption="zarejestruj"
                  className="w-full"
                />
                <a
                  href={HOME_ROUTE}
                  className="underline mt-20 mx-auto font-secondary text-14"
                >
                  Masz już konto? Zaloguj się
                </a>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default Register;
