import ValarButton from "@components/ValarButton";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <main className="centerOnScreenRow">
      <div className="w-responsive-home-buttons homeButtons">
        <ValarButton
          className="homeButton"
          text="Solicitudes"
          onClick={() => router.push("/home/solicitarContacto")}
        />
        <ValarButton className="homeButton" text="Mensajes" />
        <ValarButton
          className="homeButton"
          text="Perfil"
          onClick={() => router.push("/home/perfil")}
        />
      </div>
    </main>
  );
};

export default Home;
