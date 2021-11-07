import { ReactNode } from "react";

type ValarButtonProps = {
  text: string;
  secondary?: boolean;
  onClick: () => void;
};

const ValarButton: React.FC<ValarButtonProps> = (props: ValarButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`valarButton ${
        props.secondary ? "secondaryBackground" : "primaryBackground"
      }`}
    >
      {props.text}
    </button>
  );
};

export default ValarButton;

// componente = función que recibe input (props, properties) retorna JSX (HTML+JS)
