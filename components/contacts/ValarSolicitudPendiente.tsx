import { BiTimeFive } from "react-icons/bi";

interface ValarSolicitudEntranteProps {
  key: string;
  username: string;
}

const ValarSolicitudPendiente: React.FC<ValarSolicitudEntranteProps> = (
  props
) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-400">
      <div title={`\'${props.username}\' te mandó una solicitud`}>
        {props.username}
      </div>
      <div className="flex justify-center items-center p-2">
        <BiTimeFive
          // 1x - 14px
          // 2x - 28px
          // 3x - 42px
          // 4x - 56px
          // 5x - 70px
          size={28}
          title="Esperando aceptación"
          className="cursor-pointer hover:text-green-700"
        />
      </div>
    </div>
  );
};

export default ValarSolicitudPendiente;
