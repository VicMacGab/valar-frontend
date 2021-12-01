import { Message } from "@utils/interfaces/Message";

interface ValarMessageProps {
  msg: Message;
}

const ValarMessage: React.FC<ValarMessageProps> = (props) => {
  console.log("received message: ", props.msg);
  return (
    <div
      className={`chat-message ${
        props.msg.fromMe ? "my-chat-message" : "friend-chat-message"
      }`}
    >
      {props.msg.content}
    </div>
  );
};

export default ValarMessage;
