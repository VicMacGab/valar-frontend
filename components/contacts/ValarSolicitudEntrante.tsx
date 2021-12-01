import { BsCheckCircle } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

interface ValarSolicitudEntranteProps {
  key: string;
  username: string;
  onAccept: (username: string) => void;
  onDecline: (username: string) => void;
}

const ValarSolicitudEntrante: React.FC<ValarSolicitudEntranteProps> = (
  props
) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-400">
      <div title={`\'${props.username}\' te mandó una solicitud`}>
        {props.username}
      </div>
      <div className="flex justify-center items-center p-2">
        <BsCheckCircle
          size={28}
          title="Aceptar Solicitud"
          className="cursor-pointer hover:text-green-700"
          onClick={() => props.onAccept(props.username)}
        />
        <ImCancelCircle
          size={28}
          title="Rechazar Solicitud"
          className="ml-1 cursor-pointer hover:text-red-700"
          onClick={() => props.onDecline(props.username)}
        />
      </div>
    </div>
  );
};

export default ValarSolicitudEntrante;
