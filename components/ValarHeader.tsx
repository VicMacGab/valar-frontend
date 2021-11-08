import Image from "next/image";

const ValarHeader: React.FC<{}> = (props) => {
  return (
    <nav className="navigation centerRowPushRight">
      <div className="centeredRowNav p-5 navInfo">
        <Image
          src={require("../public/favicon.png")}
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
