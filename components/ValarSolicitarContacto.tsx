import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import ClientService from "services/ClientService";
import CommonService from "services/CommonService";
import ValarButton from "./ValarButton";
import ValarModal from "./ValarModal";

const ValarSolicitarContacto: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const searchByUsername = () => {
    console.log("searching for user: ", username);

    ClientService.findUserByUsername(username)
      .then((res: AxiosResponse) => {
        console.group("Server Response");
        console.log(res);
        console.groupEnd();
        setModalTitle(`¡${username} existe!`);
        setModalBody("Le puedes mandar una solicitud de chat si deseas.");
      })
      .catch((err: AxiosError) => {
        console.group("Server Error");
        console.log(err);
        console.groupEnd();
        console.log("hola");
        setModalTitle(`¡${username} no existe!`);
        setModalBody("Intenta con otro username.");
      })
      .finally(() => {
        console.log("hola2");
        setModalIsOpen(true);
      });
  };

  return (
    <>
      <ValarModal
        isOpen={modalIsOpen}
        title={modalTitle}
        body={modalBody}
        okText="OK"
        onClose={() => {
          setModalIsOpen(false);
          setUsername("");
        }}
      />
      <div className="centeredRowSpaceBetween searchContainerWidth">
        <input
          className="flex-big valarSearchInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.currentTarget.value)
          }
        />
        <ValarButton
          className="flex-small"
          text="Buscar"
          disabled={username.length < 2}
          secondary
          onClick={searchByUsername}
        />
      </div>
    </>
  );
};

export default ValarSolicitarContacto;
