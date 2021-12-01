import { BsChevronRight } from "react-icons/bs";

interface ValarChatPreviewProps {
  username: string;
  onClick: () => void;
}

const ValarChatPreview: React.FC<ValarChatPreviewProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="flex justify-center items-center p-4 hover:bg-gray-400 cursor-pointer border-red-400 border-l-2 my-3"
    >
      <div className="chatPreviewUsername">{props.username}</div>
      <div className="chatPreviewIcon flex justify-end items-center">
        <BsChevronRight />
      </div>
    </div>
  );
};

export default ValarChatPreview;
