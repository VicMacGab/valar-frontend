import ValarButton from "@components/ValarButton";
import ValarSignIn from "@components/ValarSignIn";
import { NextPage } from "next";
import Head from "next/head";

const SignIn: NextPage = () => {
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
        <ValarSignIn />
      </main>
    </section>
  );
};

export default SignIn;
