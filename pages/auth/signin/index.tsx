import ValarSignIn from "@components/auth/ValarSignIn";
import { NextPage } from "next";

const SignIn: NextPage = () => {
  return (
    <section className="centerOnScreenCol">
      <main>
        <ValarSignIn />
      </main>
    </section>
  );
};

export default SignIn;
