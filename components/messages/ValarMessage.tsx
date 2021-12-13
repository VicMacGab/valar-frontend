import { Message } from "@utils/interfaces/Message";
import { useState } from "react";

interface ValarMessageProps {
  msg: Message;
}

const ValarMessage: React.FC<ValarMessageProps> = (props) => {
  const time = new Date(props.msg.timestamp!)
    .toLocaleTimeString(navigator.language)
    .slice(0, 5);
  console.log(time);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  return (
    <div
      className={`chat-message ${
        props.msg.fromMe ? "my-chat-message" : "friend-chat-message"
      } relative`}
      contentEditable={editing}
      suppressContentEditableWarning={true}
      onDoubleClick={() => {
        if (props.msg.fromMe) {
          setEditing(true);
          console.log(editing);
        }
      }}
      onBlur={() => {
        setEditing(false);
        //editMessage(content: string, messageId: string)
      }}
    >
      {props.msg.content}
      <span
        className={`absolute text-black italic text-xs ${
          props.msg.fromMe ? "-left-8" : "-right-8"
        }`}
        contentEditable={false}
      >
        {time}
      </span>
    </div>
  );
};

export default ValarMessage;
