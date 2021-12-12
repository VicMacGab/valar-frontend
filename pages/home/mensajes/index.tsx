import ValarChats from "@components/messages/ValarChats";
import { NextPage } from "next";
import { useEffect } from "react";

const Mensajes: NextPage = () => {
  return (
    <main className="mensajesPageHeight w-screen mt-20">
      <ValarChats />
    </main>
  );
};

export default Mensajes;
