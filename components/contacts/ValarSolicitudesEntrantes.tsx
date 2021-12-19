import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "@utils/interfaces/User";
import ValarSolicitudEntrante from "./ValarSolicitudEntrante";
import ValarModal from "@components/general/ValarModal";
import { createDiffieHellman } from "diffie-hellman";
import ValarSpinner from "@components/general/ValarSpinner";

interface IncomingRequest {
  _id: string;
  user: User;
}

const ValarSolicitudesEntrantes: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>(
    []
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    ClientService.getIncomingRequests()
      .then((res: AxiosResponse) => {
        console.group("Incoming Request Res");
        console.log(res);
        console.groupEnd();
        setIncomingRequests(res.data.incomingRequests);
      })
      .catch((err: AxiosError) => {
        console.group("Incoming Request Err");
        console.log(err);
        console.groupEnd();
        setError(err.response?.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const acceptRequest = async (username: string) => {
    // TODO: recibir g, p y pubKey del servidor
    // TODO:

    try {
      const acceptedChatRes = await ClientService.acceptChatRequest({
        username,
      });

      // borrar el request recien aceptado
      setIncomingRequests((prev) => {
        return prev.filter((req) => req.user.username !== username);
      });

      console.group("Accepted Request Res");
      console.log(acceptedChatRes);
      console.groupEnd();

      console.log("acceptedChatRes.data.p.data: ", acceptedChatRes.data.p.data);

      console.log("acceptedChatRes.data.g.data: ", acceptedChatRes.data.g.data);

      console.log(
        "acceptedChatRes.data.peerPublicPart.data: ",
        acceptedChatRes.data.peerPublicPart.data
      );

      const prime = Buffer.from(acceptedChatRes.data.p.data).toString("hex");
      const generator = Buffer.from(acceptedChatRes.data.g.data).toString(
        "hex"
      );

      const me = createDiffieHellman(prime, "hex", generator, "hex");

      console.log("created diffie hellman");

      const pubKey = me.generateKeys();
      console.log("created pub key: ");
      const secret = me.computeSecret(acceptedChatRes.data.peerPublicPart.data);
      console.log("secret: ", secret);

      const sendPublicKeyRes = await ClientService.sendPubKeyUrl({
        p: acceptedChatRes.data.p.data,
        g: acceptedChatRes.data.g.data,
        pubKey: Array.from(pubKey),
        friendUsername: username,
      });

      console.group("Send Pub Key Res");
      console.log(sendPublicKeyRes);
      console.groupEnd();

      // TODO: guardar el secret en localStorage (pero luego en IndexedDB)
      localStorage.setItem(
        `${sendPublicKeyRes.data.chatId}`,
        secret.toString("hex")
      );

      setTitle("Solicitud aceptada");
      setBody(
        `Ahora puedes chatear con ${username} en la sección de 'Mensajes'`
      );
    } catch (error) {
      console.group("Err Accepting Chat or Sending Pub Key");
      console.log(error);
      console.groupEnd();
      setTitle("Ocurrió un error");
      setBody("No pudimos aceptar la solicitud. Inténtalo más tarde.");
    } finally {
      setIsOpen(true);
    }
  };

  const declineRequest = (username: string) => {
    ClientService.declineChatRequest({ username })
      .then((res: AxiosResponse) => {
        console.group("Decline Request Res");
        console.log(res);
        console.groupEnd();
        setTitle("Solicitud rechazada");
        setBody(`Se ha eliminado la solicitud de ${username}.`);
        setIncomingRequests((prev) => {
          return prev.filter((req) => req.user.username !== username);
        });
      })
      .catch((err: AxiosError) => {
        console.group("Decline Request Err");
        console.log(err);
        console.groupEnd();
        setTitle("Ocurrió un error");
        setBody("No pudimos aceptar la solicitud. Inténtalo más tarde.");
      })
      .finally(() => setIsOpen(true));
  };

  const closeModal = () => {
    setTitle("");
    setBody("");
    setIsOpen(false);
  };

  return (
    <>
      <ValarModal
        title={title}
        body={body}
        isOpen={isOpen}
        okText={"OK"}
        onConfirm={closeModal}
      />
      <div className="mt-20 pt-3 w-screen h-screen flex flex-col justify-start items-center px-2">
        <h1 className="text-3xl text-center my-4 pb-2 border-b-2 border-red-900">
          Solicitudes Entrantes
        </h1>
        {loading && (
          <div className="flex justify-center items-center">
            <ValarSpinner size={27} />
          </div>
        )}
        {!loading && !error && incomingRequests.length == 0 && (
          <h6 className="text-xl text-center">
            No tienes solicitudes entrantes.
          </h6>
        )}
        {!loading && !error && incomingRequests.length > 0 && (
          <div className="w-solicitudes">
            {incomingRequests.map((incomingRequest) => (
              <ValarSolicitudEntrante
                key={incomingRequest._id}
                username={incomingRequest.user.username}
                onAccept={acceptRequest}
                onDecline={declineRequest}
              />
            ))}
          </div>
        )}
        {!loading && error && <p>An error occured: {error}</p>}
      </div>
    </>
  );
};

export default ValarSolicitudesEntrantes;
