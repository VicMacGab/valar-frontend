import { Chat } from "@utils/interfaces/Chat";
import { Message } from "@utils/interfaces/Message";
import { useEffect } from "react";
import ValarMessage from "./ValarMessage";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface ValarChatProps {
  me: string;
  friend: string;
  chat: {
    _id: string;
    messages: Message[];
  };
  onGoBack: () => void;
}

const ValarChat: React.FC<ValarChatProps> = (props) => {
  // TODO: editar mensaje
  // TODO: poner la hora del mensaje con un position absolute

  return (
    <div
      id="chatContainer"
      className="flex flex-col justify-center items-stretch relative pb-"
    >
      <h1 className="text-center font-black py-1 sticky top-0 secondaryBackground text-white border-red-400 border-2">
        {props.friend}
        <IoArrowBackCircleOutline
          onClick={props.onGoBack}
          className="appearsWhenChatTight absolute left-3 centerAbsoluteVertically"
        />
      </h1>
      <div className="block chat mt-2">
        {/* TODO: chequear si es mi mensaje */}
        {props.chat.messages.map((msg: Message) => {
          // TODO que compare el ID y no el USERNAME
          msg.fromMe = msg.usernameFrom == props.me;
          return <ValarMessage key={msg._id} msg={msg} />;
        })}
      </div>
    </div>
  );
};

export default ValarChat;
