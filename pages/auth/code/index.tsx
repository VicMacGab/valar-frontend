import ValarAuthCode from "@components/ValarAuthCode";
import { NextPage } from "next";
import Head from "next/head";

// TODO: middleware, si no tiene el 'username' token, no debería entrar a esta vista

const AuthCode: NextPage = () => {
  return (
    <section className="centerOnScreenCol">
      <Head>
        <title>Valar</title>
        <meta
          name="description"
          content="World's most awesome and secure chat."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="centeredCol">
        <ValarAuthCode />
      </main>
    </section>
  );
};

export default AuthCode;
