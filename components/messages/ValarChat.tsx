import { Chat } from "@utils/interfaces/Chat";
import { Message } from "@utils/interfaces/Message";
import { useEffect, useState } from "react";
import ValarMessage from "./ValarMessage";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";
import { useForceUpdate } from "@utils/hooks/forceUpdate";
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
  const forceUpdate = useForceUpdate();

  const editMessageWithId = (
    msgId: string,
    newContent: string,
    msgIdx: number
  ): void => {
    props.onEditMessage({ msgId, newContent, msgIdx, chatId: props.chat._id });
    // ClientService.editMessage(newContent, msgId)
    //   .then((res: AxiosResponse) => {
    //     console.group("Edit Message Res");
    //     console.log(res);
    //     console.groupEnd();
    //     props.chat.messages[msgIdx].content = newContent;
    //     props.chat.messages[msgIdx].edited = true;
    //     console.log("mensage editado: ", props.chat.messages[msgIdx]);
    //     forceUpdate();
    //   })
    //   .catch((err: AxiosError) => {
    //     console.group("Edit Message Err");
    //     console.log(err);
    //     console.groupEnd();
    //     console.error("ocurrió un error al editar tu mensaje");
    //   });
    console.log("edit message with id ", msgId, "and content ", newContent);
  };

  const deleteMessageWithId = (msgId: string, msgIdx: number): void => {
    props.onDeleteMessage({ msgId, msgIdx, chatId: props.chat._id });
    // ClientService.deleteMessage(msgId)
    //   .then((res: AxiosResponse) => {
    //     console.group("Delete Message Res");
    //     console.log(res);
    //     console.groupEnd();
    //     props.chat.messages[msgIdx].deleted = true;
    //     console.log("mensage borrado: ", props.chat.messages[msgIdx]);
    //     forceUpdate();
    //   })
    //   .catch((err: AxiosError) => {
    //     console.group("Delete Message Err");
    //     console.log(err);
    //     console.groupEnd();
    //   });
    console.log("delete message with id ", msgId);
  };

  return (
    <div
      id="chatContainer"
      className="flex flex-col justify-center items-stretch relative"
    >
      <h1 className="text-center font-black py-1 sticky z-50 top-0 secondaryBackground text-white drop-shadow-2xl">
        {props.friend}
        <IoArrowBackCircleOutline
          onClick={props.onGoBack}
          className="appearsWhenChatTight absolute left-3 centerAbsoluteVertically"
        />
      </h1>
      <div className="block chat mt-2 px-1">
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
