import ValarSignUp from "@components/ValarSignUp";
import { NextPage } from "next";
import Head from "next/head";

const SignUp: NextPage = () => {
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
      <main>
        <ValarSignUp />
      </main>
    </section>
  );
};

export default SignUp;
