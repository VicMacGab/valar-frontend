import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "@utils/interfaces/User";
import ValarSolicitudEntrante from "./ValarSolicitudEntrante";
import ValarModal from "@components/general/ValarModal";

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
    // corre cuando el componente se renderiza
    ClientService.getIncomingRequests()
      .then((res: AxiosResponse) => {
        console.group("Incoming Request Res");
        console.log(res);
        console.groupEnd();
        setIncomingRequests(res.data.incomingRequests);
        // setIncomingRequests([
        //   {
        //     _id: "1",
        //     user: {
        //       username: "hola",
        //       email: "",
        //       verified: true,
        //     },
        //   },
        //   {
        //     _id: "2",
        //     user: {
        //       username: "holaaaa",
        //       email: "",
        //       verified: true,
        //     },
        //   },
        //   {
        //     _id: "3",
        //     user: {
        //       username: "que tal",
        //       email: "",
        //       verified: true,
        //     },
        //   },
        //   {
        //     _id: "4",
        //     user: {
        //       username: "como estas",
        //       email: "",
        //       verified: true,
        //     },
        //   },
        // ]);
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

  const acceptRequest = (username: string) => {
    ClientService.acceptChatRequest({ username })
      .then((res: AxiosResponse) => {
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
      })
      .catch((err: AxiosError) => {
        console.group("Accepted Request Err");
        console.log(err);
        console.groupEnd();
        setTitle("Ocurrió un error");
        setBody("No pudimos aceptar la solicitud. Inténtalo más tarde.");
      })
      .finally(() => setIsOpen(true));
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
          <h6 className="text-xl">No tienes solicitudes entrantes.</h6>
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
