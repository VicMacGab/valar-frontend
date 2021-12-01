import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";

import ClientService from "services/ClientService";
import ValarButton from "./ValarButton";
import ValarModal from "./ValarModal";

const ValarSolicitarContacto: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [usernameNotFound, setUsernameNotFound] = useState(false);

  const searchByUsername = () => {
    console.log("searching for user: ", username);

    // TODO: poner el buscador en el medio
    // TODO: caso cuando el servidor dice que ya le mandaste solicitud a ese username
    // TODO: caso cuando el servidor dice que esa persona ya te agregó
    // TODO: caso cuando el servidor dice que ya es tu contacto

    ClientService.findUserByUsername(username)
      .then((res: AxiosResponse) => {
        console.group("Server Response");
        console.log(res);
        console.groupEnd();
        setModalTitle(`¡El username '${username}' existe!`);
        setModalBody("Le puedes mandar una solicitud de chat si deseas.");
      })
      .catch((err: AxiosError) => {
        console.group("Server Error");
        console.log(err.response);
        console.groupEnd();
        setModalTitle(`¡No encontramos a alguien llamado '${username}'!`);
        setModalBody("Intenta con otro username.");
        setUsernameNotFound(true);
      })
      .finally(() => {
        setModalIsOpen(true);
      });
  };

  const getIncomingRequests = () => {
    ClientService.getIncomingRequests()
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  const sendChatRequest = () => {
    console.log(`mandarle solicitud a ${username}`);
    ClientService.sendChatRequest({ username })
      .then((res: AxiosResponse) => {
        console.group("Server Response");
        console.log(res);
        console.groupEnd();
        setModalTitle(`¡Solicitud a '${username}' enviada!`);
        setModalBody("Podrás enviar un mensaje cuando te haya aceptado.");
      })
      .catch((err: AxiosError) => {
        console.group("Server Error");
        console.log(err.response);
        console.groupEnd();
        setModalTitle(`¡Error!`);
        setModalBody("Intentalo nuevamente.");
        setUsernameNotFound(true);
      })
      .finally(() => {
        setModalIsOpen(true);
      });
    //modalCleanup();
  };

  const acceptChatRequest = () => {
    // TODO generalizar
    ClientService.acceptChatRequest({ username: "mrmm" })
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  const modalCleanup = () => {
    setModalIsOpen(false);
    setUsername("");
    setUsernameNotFound(false);
  };

  return (
    <>
      {modalIsOpen && !usernameNotFound && (
        <ValarModal
          isOpen={modalIsOpen}
          title={modalTitle}
          body={modalBody}
          okText={"Enviar"}
          cancelText={"Ahorita No"}
          onConfirm={() => sendChatRequest()}
          onCancel={() => modalCleanup()}
        />
      )}
      {modalIsOpen && usernameNotFound && (
        <ValarModal
          isOpen={modalIsOpen}
          title={modalTitle}
          body={modalBody}
          cancelText={"OK"}
          onCancel={() => modalCleanup()}
        />
      )}
      <div className="centeredRowSpaceBetween searchContainerWidth solicitarContactoContainer">
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
          disabled={username.length < 4}
          secondary
          onClick={searchByUsername}
        />
      </div>
      <ValarButton
        className="flex-small"
        text="Ver solicitudes entrantes"
        //disabled={username.length < 2}
        secondary
        onClick={getIncomingRequests}
      />
      <ValarButton
        className="flex-small"
        text="Aceptar solicitud"
        //disabled={username.length < 2}
        secondary
        onClick={acceptChatRequest}
      />
    </>
  );
};

export default ValarSolicitarContacto;
