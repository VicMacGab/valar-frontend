import { OutgoingRequest } from "@utils/interfaces/OutgoingRequest";
import { BiTimeFive } from "react-icons/bi";
import { BsFillCheckSquareFill } from "react-icons/bs";

interface ValarSolicitudPendienteProps {
  key: string;
  request: OutgoingRequest;
  onGoToChat: (outgoingRequest: OutgoingRequest) => void;
}

const ValarSolicitudPendiente: React.FC<ValarSolicitudPendienteProps> = (
  props
) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-400">
      <div title={`\'${props.request.user.username}\' te mandó una solicitud`}>
        {props.request.user.username}
      </div>
      <div className="flex justify-center items-center p-2">
        {!props.request.accepted && (
          <BiTimeFive
            // 1x - 14px
            // 2x - 28px
            // 3x - 42px
            // 4x - 56px
            // 5x - 70px
            size={28}
            title="Esperando aceptación"
            className="hover:text-yellow-400"
          />
        )}
        {props.request.accepted && (
          <BsFillCheckSquareFill
            // 1x - 14px
            // 2x - 28px
            // 3x - 42px
            // 4x - 56px
            // 5x - 70px
            size={42}
            title="Ir al Chat"
            className="cursor-pointer text-blue-600 hover:text-green-700"
            onClick={() => props.onGoToChat(props.request)}
          />
        )}
      </div>
    </div>
  );
};

export default ValarSolicitudPendiente;
