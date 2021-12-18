import { NextPage } from "next";
import dynamic from "next/dynamic";

const ValarSolicitarContacto = dynamic(
  () => import("../../../components/contacts/ValarSolicitarContacto"),
  {
    ssr: false,
  }
);

const SolicitarContacto: NextPage = () => {
  return (
    <section className="centerOnScreenCol">
      <ValarSolicitarContacto />
    </section>
  );
};

export default SolicitarContacto;
