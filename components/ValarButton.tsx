import { ReactNode } from "react";

type ValarButtonProps = {
  text: string;
  secondary?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const ValarButton: React.FC<ValarButtonProps> = (props: ValarButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type ?? "button"}
      disabled={props.disabled}
      className={`valarButton ${
        props.secondary ? "secondaryBackground" : "primaryBackground"
      } ${props.className ?? ""}`}
    >
      {props.text}
    </button>
  );
};

export default ValarButton;

// componente = función que recibe input (props, properties) retorna JSX (HTML+JS)
