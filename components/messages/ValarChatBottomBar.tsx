import ValarButton from "@components/general/ValarButton";
import React, { useState } from "react";

interface ValarChatBottomBarProps {
  onSend: (text: string) => void;
}

const ValarChatBottomBar: React.FC<ValarChatBottomBarProps> = (props) => {
  const [text, setText] = useState("");

  return (
    <>
      <textarea
        className="flex-8 outline-none p-2"
        placeholder="Escribe un mensaje..."
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <ValarButton
        disabled={text.length == 0}
        className="flex-2 my-0"
        text="Enviar"
        onClick={() => {
          props.onSend(text);
          setText("");
        }}
      />
    </>
  );
};

export default ValarChatBottomBar;
