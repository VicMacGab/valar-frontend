import { Message } from "@utils/interfaces/Message";
import { useCallback, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

interface ValarMessageProps {
  idx: number;
  msg: Message;
  onMessageEdited: (msgId: string, newContent: string, msgIdx: number) => void;
  onMessageDeleted: (msgId: string, msgIdx: number) => void;
}

// TODO: meterle useMemo perhaps o algo
const ValarMessage: React.FC<ValarMessageProps> = (props) => {
  // TODO: hay mucho que memoizar acá
  const time = new Date(props.msg.timestamp!)
    .toLocaleTimeString(navigator.language, { hour12: false })
    .slice(0, 5);
  const [newContent, setNewContent] = useState(props.msg.content);
  const [editing, setEditing] = useState(false);
  const [hovering, setHovering] = useState(false);
  console.log("message rendered");

  const getMsgContent = () => {
    if (props.msg.deleted) {
      console.log("este mensaje ha sido borado");
      return <div className="italic">Mensaje borrado</div>;
    } else {
      if (props.msg.edited) {
        console.log("este mensaje ha sido editado");
        return (
          <div className="relative">
            {props.msg.content}
            <span className="absolute text-xxs -bottom-2 right-1">
              <div>(e)</div>
            </span>
          </div>
        );
      } else {
        return <div>{props.msg.content}</div>;
      }
    }
  };

  const editMessage = (): void => {
    //TODO:
    setEditing(false);
    props.onMessageEdited(props.msg._id, newContent, props.idx);
  };

  const deleteMessage = (): void => {
    //TODO:
    props.onMessageDeleted(props.msg._id, props.idx);
  };

  return (
    <div
      className={`relative chat-message increaseHoverAreaLeft focus:outline-none focus:ring-offset-1 focus:ring focus:ring-pink-600 ${
        props.msg.fromMe ? "my-chat-message" : "friend-chat-message"
      }`}
      onMouseEnter={() =>
        props.msg.fromMe && !props.msg.deleted ? setHovering(true) : undefined
      }
      onMouseLeave={() =>
        props.msg.fromMe && !props.msg.deleted ? setHovering(false) : undefined
      }
    >
      {props.msg.fromMe && !props.msg.deleted && hovering && (
        <>
          <span
            className={
              "absolute -left-4 top-1 z-10 p-1 bg-white rounded-lg hover:bg-gray-400 cursor-pointer"
            }
            onClick={deleteMessage}
          >
            <RiDeleteBinFill
              title="Borrar el mensaje"
              className="text-valar-primary"
            />
          </span>
          <span
            className={
              "absolute -left-10 top-1 z-10 p-1 bg-white rounded-lg hover:bg-gray-400 cursor-pointer"
            }
            onClick={() => {
              setEditing(true);
            }}
          >
            <AiFillEdit
              title="Editar el mensaje"
              className="text-valar-secondary"
            />
          </span>
        </>
      )}
      {editing && (
        <input
          className="outline-none border-none bg-transparent p-0 m-0 pl-1 w-auto"
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.currentTarget.value)}
          onBlur={editMessage}
        />
      )}
      {!editing && (
        <>
          {getMsgContent()}
          <span
            className={`absolute text-black italic text-xs ${
              props.msg.fromMe ? "-left-8" : "-right-8"
            }`}
          >
            {time}
          </span>
        </>
      )}
    </div>
  );
};

export default ValarMessage;
