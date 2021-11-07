// type SignInProps {};

import { useState } from "react";
import ValarButton from "./ValarButton";
import axios from "axios";

const ValarSignIn: React.FC<{}> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    console.log("user sign in", { username, password });
    // TODO:
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
      />
      <ValarButton text="Sign In" onClick={signIn} />
    </section>
  );
};

export default ValarSignIn;
