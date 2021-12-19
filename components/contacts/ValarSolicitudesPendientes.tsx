import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "@utils/interfaces/User";
import ValarSolicitudPendiente from "./ValarSolicitudPendiente";
import { createDiffieHellman } from "diffie-hellman";
import { OutgoingRequest } from "@utils/interfaces/OutgoingRequest";
import { useRouter } from "next/dist/client/router";
import ValarSpinner from "@components/general/ValarSpinner";

const ValarSolicitudesPendientes: React.FC<{}> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outgoingRequests, setOutgoingRequests] = useState<OutgoingRequest[]>(
    []
  );

  useEffect(() => {
    ClientService.getOutgoingRequests()
      .then((res: AxiosResponse) => {
        console.group("Outgoing Request Res");
        console.log(res);
        console.groupEnd();
        setOutgoingRequests(res.data.outgoingRequests);
      })
      .catch((err: AxiosError) => {
        console.group("Outgoing Request Err");
        console.log(err);
        console.groupEnd();
        setError(err.response?.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goToChat = async (outgoingRequest: OutgoingRequest) => {
    // TODO: este metodo no deberia estar aquí
    // @ts-ignore
    const prime = Buffer.from(outgoingRequest.p.data).toString("hex");
    // @ts-ignore
    const generator = Buffer.from(outgoingRequest.g.data).toString("hex");
    const me = createDiffieHellman(prime, "hex", generator, "hex");
    me.setPrivateKey(
      Buffer.from(
        localStorage.getItem(`${outgoingRequest.user.username}`)!,
        "hex"
      )
    );

    me.generateKeys();
    // @ts-ignore
    const secret = me.computeSecret(outgoingRequest.peerPublicPart.data);

    const finishRes = await ClientService.finish({
      friendUsername: outgoingRequest.user.username,
      friendId: outgoingRequest.user._id,
    });
    console.group("Finish Exchange Res");
    console.log(finishRes);
    console.groupEnd();
    localStorage.removeItem(`${outgoingRequest.user.username}`);
    localStorage.setItem(`${finishRes.data.chatId}`, secret.toString("hex"));
    // TODO: avisarle
    router.push("/home/mensajes");
  };

  return (
    <div className="mt-20 pt-3 w-screen h-screen flex flex-col justify-start items-center px-2">
      <h1 className="text-3xl text-center my-4 pb-2 border-b-2 border-red-900">
        Solicitudes Pendientes
      </h1>
      {loading && (
        <div className="flex justify-center items-center">
          <ValarSpinner size={27} />
        </div>
      )}
      {!loading && !error && outgoingRequests.length == 0 && (
        <h6 className="text-xl text-center">
          No has mandado ninguna solicitud.
        </h6>
      )}
      {!loading && !error && outgoingRequests.length > 0 && (
        <div className="w-solicitudes">
          {outgoingRequests.map((outgoingRequest) => (
            <ValarSolicitudPendiente
              key={outgoingRequest._id}
              request={outgoingRequest}
              onGoToChat={goToChat}
            />
          ))}
        </div>
      )}
      {!loading && error && <p>An error occured: {error}</p>}
    </div>
  );
};

export default ValarSolicitudesPendientes;
