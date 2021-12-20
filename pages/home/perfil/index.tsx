import ValarButton from "@components/general/ValarButton";
import ValarModal from "@components/general/ValarModal";
import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Perfil: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const router = useRouter();

  const logout = () => {
    ClientService.logout()
      .then((res: AxiosResponse) => {
        console.group("Logout Res");
        console.log(res);
        console.groupEnd();
        setModalTitle("Se cerró su sesión.");
        setModalBody(res.data.msg);
      })
      .catch((err: AxiosError) => {
        console.group("Logout Err");
        console.log(err);
        console.groupEnd();
        setModalTitle("Ocurrió un error al cerrar su sesión.");
        setModalBody(err.response?.data.msg);
      })
      .finally(() => {
        setTimeout(() => setModalIsOpen(true), 1000);
      });
  };

  const goBack = () => {
    router.push("/");
    setModalIsOpen(false);
  };

  return (
    <section className="centerOnScreenCol">
      <ValarModal
        isOpen={modalIsOpen}
        title={modalTitle}
        body={modalBody}
        okText={"OK"}
        onConfirm={() => goBack()}
      />
      <ValarButton text="Logout" onClick={logout} />
    </section>
  );
};

export default Perfil;
