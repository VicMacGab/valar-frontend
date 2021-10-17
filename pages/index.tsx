import type { NextPage } from "next";
import Head from "next/head";
import styles from "@styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="centerOnScreen">
      <Head>
        <title>Valar</title>
        <meta
          name="description"
          content="World's most awesome and secure chat."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="centered">
        <h1>Valar</h1>
      </main>
    </div>
  );
};

export default Home;
