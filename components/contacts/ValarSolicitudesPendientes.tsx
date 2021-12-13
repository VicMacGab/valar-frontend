import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "@utils/interfaces/User";
import ValarSolicitudPendiente from "./ValarSolicitudPendiente";

interface OutgoingRequest {
  _id: string;
  user: User;
}

const ValarSolicitudesPendientes: React.FC<{}> = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outgoingRequests, setOutgoingRequests] = useState<OutgoingRequest[]>(
    []
  );

  useEffect(() => {
    // corre cuando el componente se renderiza
    ClientService.getOutgoingRequests()
      .then((res: AxiosResponse) => {
        console.group("Incoming Request Res");
        console.log(res);
        console.groupEnd();
        setOutgoingRequests(res.data.outgoingRequests);
        // setOutgoingRequests([
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

  return (
    <div className="mt-20 pt-3 w-screen h-screen flex flex-col justify-start items-center">
      <h1 className="text-3xl my-4 pb-2 border-b-2 border-red-900">
        Solicitudes Pendientes
      </h1>
      {loading && <h2>Obteniendo solicitudes pendientes...</h2>}
      {!loading && !error && outgoingRequests.length == 0 && (
        <h6 className="text-xl">No has mandado ninguna solicitud.</h6>
      )}
      {!loading && !error && outgoingRequests.length > 0 && (
        <div className="w-solicitudes">
          {outgoingRequests.map((outgoingRequest) => (
            <ValarSolicitudPendiente
              key={outgoingRequest._id}
              username={outgoingRequest.user.username}
            />
          ))}
        </div>
      )}
      {!loading && error && <p>An error occured: {error}</p>}
    </div>
  );
};

export default ValarSolicitudesPendientes;
