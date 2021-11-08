import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import CommonService from "services/CommonService";
import ValarButton from "./ValarButton";

const ValarSolicitarContacto: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");

  const searchByUsername = () => {
    console.log("searching for user: ", username);
    axios
      .get(`${CommonService.searchUserByUsernameUrl}/${username}`)
      .then((res: AxiosResponse) => {
        console.group("Server Response");
        console.log(res);
        console.groupEnd();
      })
      .catch((err: AxiosError) => {
        console.group("Server Error");
        console.log(err);
        console.groupEnd();
      });
  };

  return (
    <div className="centeredRowSpaceBetween searchContainerWidth">
      <input
        className="flex-big valarSearchInput"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.currentTarget.value)
        }
      />
      <ValarButton
        className="flex-small"
        text="Buscar"
        disabled={username.length < 2}
        secondary
        onClick={searchByUsername}
      />
    </div>
  );
};

export default ValarSolicitarContacto;
