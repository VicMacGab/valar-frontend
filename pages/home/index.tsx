import ValarButton from "@components/ValarButton";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <main className="centerOnScreenRow">
      <div className="w-home-responsive homeButtons">
        <ValarButton
          className="homeButton"
          text="Solicitudes"
          onClick={() => router.push("/home/solicitarContacto")}
        />
        <ValarButton className="homeButton" text="Mensajes" />
        <ValarButton className="homeButton" text="Perfil" />
      </div>
    </main>
  );
};

export default Home;
