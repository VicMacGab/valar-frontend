import { DH_KEY_SIZE_BYTES } from "@utils/constants/general";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import ClientService from "services/ClientService";
import ValarButton from "../general/ValarButton";
import ValarModal from "../general/ValarModal";
import { createDiffieHellman } from "diffie-hellman";

const ValarSolicitarContacto: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [usernameNotFound, setUsernameNotFound] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const sendingRequest = useRef<boolean>(false);

  const searchByUsername = () => {
    console.log("searching for user: ", username);

    // TODO: poner el buscador en el medio
    // TODO: caso cuando el servidor dice que ya le mandaste solicitud a ese username
    // TODO: caso cuando el servidor dice que esa persona ya te agregó
    // TODO: caso cuando el servidor dice que ya es tu contacto
    // TODO: poner un loader

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

  const generateDH = (): { g: Buffer; pubKey: Buffer; p: Buffer } => {
    const alice = createDiffieHellman(DH_KEY_SIZE_BYTES);
    console.log("created diffie hellman");
    const pubKey = alice.generateKeys();
    console.log("got pub key");
    const p = alice.getPrime();
    console.log("got priv key");
    const privKey = alice.getPrivateKey();
    console.log("got prime");
    const g = alice.getGenerator();
    console.log("got generator");
    console.log("pubKey: ", pubKey);
    console.log("p: ", p);
    console.log("g: ", g);
    console.log("privKey: ", privKey);
    // guardar el priv key porq lo necesitamos luego
    localStorage.setItem(`${username}`, privKey.toString("hex"));
    return { g, pubKey, p };
  };

  const sendChatRequest = () => {
    if (!sendingRequest.current) {
      // para prevenir mandar dos requests paralelos
      sendingRequest.current = true;
      setModalIsOpen(false);
      setUsernameNotFound(true);
      setLoading(true);
      console.log(`mandandole solicitud a ${username}`);

      // NOTE: set timeout para darle tiempo a react que renderice el loader
      setTimeout(() => {
        const dhParts = generateDH();

        ClientService.sendChatRequest({
          username,
          pubKey: dhParts.pubKey,
          p: dhParts.p,
          g: dhParts.g,
        })
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
            setModalBody(err.response?.data.msg);
            localStorage.removeItem(`${username}`);
          })
          .finally(() => {
            sendingRequest.current = false;
            setModalIsOpen(true);
          });

        setLoading(false);
        sendingRequest.current = false;
      }, 100);
    }
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
          onConfirm={sendChatRequest}
          onCancel={modalCleanup}
        />
      )}
      {loading && <ValarModal isOpen title={"Mandando solicitud"} showLoader />}
      {modalIsOpen && usernameNotFound && (
        <ValarModal
          isOpen={modalIsOpen}
          title={modalTitle}
          body={modalBody}
          cancelText={"OK"}
          onCancel={() => modalCleanup()}
        />
      )}
      <div className="max-w-full flex flex-col justify-start items-stretch gap-4">
        <div className="flex items-stretch">
          <input
            className="flex-big valarSearchInput pl-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <ValarButton
            className="valarSearchBtn flex-small"
            text="Buscar"
            disabled={username.length < 4}
            secondary
            onClick={searchByUsername}
          />
        </div>
        <div className="solicitarContactoBtns">
          <ValarButton
            className="flex-small hover:bg-red-800 border-2 border-r-2 border-red-600"
            text="Ver solicitudes entrantes"
            secondary
            onClick={() =>
              router.push("/home/solicitarContacto/solicitudes/entrantes")
            }
          />
          <ValarButton
            className="flex-small hover:bg-red-800 border-2 border-l-2 border-red-600"
            text="Ver solicitudes pendientes"
            secondary
            onClick={() =>
              router.push("/home/solicitarContacto/solicitudes/pendientes")
            }
          />
        </div>
      </div>
    </>
  );
};
export default ValarSolicitarContacto;
