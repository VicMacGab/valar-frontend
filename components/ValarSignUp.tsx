import { useState } from "react";
import ValarButton from "./ValarButton";
import axios, { AxiosError, AxiosResponse } from "axios";
import CommonService from "services/CommonService";

const ValarSignUp: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUp = () => {
    console.log("user sign up", { username, email, password });

    axios
      .post(CommonService.signUpUrl, { username, email, password })
      .then((res: AxiosResponse) => {
        // 200-299
        console.log("Server Response: ", { res });
      })
      .catch((err: AxiosError) => {
        // 300-500
        console.log("Server Error: ", { err });
      });
  };

  return (
    <section className="centeredCol">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.currentTarget.value)
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
      />
      <ValarButton text="Sign Up" onClick={signUp} />
    </section>
  );
};

export default ValarSignUp;
