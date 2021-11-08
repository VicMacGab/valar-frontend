import ValarSignUp from "@components/ValarSignUp";
import { NextPage } from "next";
import Head from "next/head";

const SignUp: NextPage = () => {
  return (
    <>
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
    </>
  );
};

export default SignUp;
