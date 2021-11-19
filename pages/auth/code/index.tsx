import ValarAuthCode from "@components/ValarAuthCode";
import { NextPage } from "next";

// TODO: middleware, si no tiene el 'username' token, no debería entrar a esta vista

const AuthCode: NextPage = () => {
  return (
    <section className="centerOnScreenCol">
      <main className="centeredCol">
        <ValarAuthCode />
      </main>
    </section>
  );
};

export default AuthCode;
