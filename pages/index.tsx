import type { NextPage } from "next";
import Image from "next/image";

import ValarButton from "@components/ValarButton";
import { useRouter } from "next/dist/client/router";

const LandingPage: NextPage = () => {
  const router = useRouter();
  // TODO: CLAMP
  return (
    <div className="centerOnScreenCol">
      <main className="w-responsive centerColStretchHorizontally">
        <Image
          src={require("../public/favicon.png")}
          objectFit={"contain"}
          width={150}
          height={150}
          alt="Logo de Valar"
        />
        <h1 className="p-5 text-center">Valar</h1>
        <div className="centerColStretchHorizontally">
          <ValarButton
            text="Sign In"
            onClick={() => router.push("/auth/signin")}
          />
          <ValarButton
            text="Sign Up"
            onClick={() => router.push("/auth/signup")}
            secondary
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
