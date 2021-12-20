import { Message } from "@utils/interfaces/Message";
import ValarMessage from "./ValarMessage";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { EditedMessage } from "@utils/interfaces/EditedMessage";
import { DeletedMessage } from "@utils/interfaces/DeletedMessage";

interface ValarChatProps {
  me: string;
  friend: string;
  chat: {
    _id: string;
    messages: Message[];
  };
  onGoBack: () => void;
  onEditMessage: (msg: EditedMessage) => void;
  onDeleteMessage: (msg: DeletedMessage) => void;
}

const ValarChat: React.FC<ValarChatProps> = (props) => {
  const editMessageWithId = (
    msgId: string,
    newContent: Uint8Array,
    msgIdx: number
  ): void => {
    props.onEditMessage({ msgId, newContent, msgIdx, chatId: props.chat._id });
    console.log("edit message with id ", msgId, "and content ", newContent);
  };

  const deleteMessageWithId = (msgId: string, msgIdx: number): void => {
    props.onDeleteMessage({ msgId, msgIdx, chatId: props.chat._id });
    console.log("delete message with id ", msgId);
  };

  return (
    <div className="h-auto w-full flex flex-col justify-bewteen items-stretch relative">
      <h1 className="text-center font-black py-1 sticky z-50 top-0 secondaryBackground text-white drop-shadow-2xl">
        {props.friend}
        <IoArrowBackCircleOutline
          onClick={props.onGoBack}
          className="appearsWhenChatTight absolute left-3 centerAbsoluteVertically"
        />
      </h1>
      <div className="block chat px-1">
        {props.chat.messages.map((msg: Message, idx: number) => {
          // TODO que compare el ID y no el USERNAME
          msg.fromMe = msg.usernameFrom == props.me;
          return (
            <ValarMessage
              idx={idx}
              key={msg._id}
              msg={msg}
              onMessageEdited={editMessageWithId}
              onMessageDeleted={deleteMessageWithId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ValarChat;
