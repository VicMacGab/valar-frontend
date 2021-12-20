import { useRouter } from "next/dist/client/router";
import Image from "next/image";

interface ValarHeaderProps {
  className?: string;
}

const ValarHeader: React.FC<ValarHeaderProps> = (props) => {
  const router = useRouter();
  return (
    <nav className="navigation centerRowPushRight">
      <div
        className="centeredRowNav p-5 navInfo"
        onClick={() => router.push("/home")}
      >
        <Image
          src={require("../../public/favicon.ico")}
          alt="Logo de Valar"
          width={50}
          height={50}
        />
        <h2 className="ml-1 bold">Valar</h2>
      </div>
    </nav>
  );
};

export default ValarHeader;
