import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "@utils/interfaces/User";
import ValarSolicitudEntrante from "./ValarSolicitudEntrante";
import ValarModal from "@components/general/ValarModal";
import { createDiffieHellman } from "diffie-hellman";

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
      const res = await ClientService.acceptChatRequest({ username });
      const me = createDiffieHellman(
        res.data.p.toString("hex"),
        "hex",
        res.data.g.toString("hex"),
        "hex"
      );

      me.generateKeys();
      const secret = me.computeSecret(res.data.peerPublicPart);

      // TODO: guardar el secret en localStorage (pero luego en IndexedDB)

      console.group("Accepted Request Res");
      console.log(res);
      console.groupEnd();
      setTitle("Solicitud aceptada");
      setBody(
        `Ahora puedes chatear con ${username} en la sección de 'Mensajes'`
      );
      // borrar el request recien aceptado
      setIncomingRequests((prev) => {
        return prev.filter((req) => req.user.username !== username);
      });

      // TODO: mandarle al servidor mi parte privada (g^b mod p) para que el otro pueda calcular el 'secret'
      // TODO: en OutGoing requests, el servidor debe decirle al que mandó el request que ya se la aceptaron, cuando haga click en 'Llevame al chat!' el servidor le manda el g^b mod p (y posiblemente otras partes) para que el cliente pueda calcular el secreto final, guardarlo y poder hablar con end-to-end encryption
      // TODO: eso implica cambios en los controllers, en la bd y en el UI
    } catch (error) {
      console.group("Accepted Request Err");
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
      <div className="mt-20 pt-3 w-screen h-screen flex flex-col justify-start items-center">
        <h1 className="text-3xl my-4 pb-2 border-b-2 border-red-900">
          Solicitudes Entrantes
        </h1>
        {loading && <h2>Obteniendo solicitudes entrantes...</h2>}
        {!loading && !error && incomingRequests.length == 0 && (
          <h6 className="text-xl">No tienes solicitudes .</h6>
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
