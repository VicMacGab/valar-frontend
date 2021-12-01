import { useState } from "react";
import ValarButton from "../general/ValarButton";
import { AxiosError, AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import ClientService from "services/ClientService";
import ValarModal from "../general/ValarModal";
interface SignInFormValues {
  username: string;
  password: string;
}

const ValarSignIn: React.FC<any> = (props) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const signIn = (formValues: SignInFormValues) => {
    setIsBusy(true);
    console.log("user sign in", {
      username: formValues.username,
      password: formValues.password,
    });

    ClientService.signIn({
      username: formValues.username,
      password: formValues.password,
    })
      .then((res: AxiosResponse) => {
        // 200-299
        console.log("Server Response: ", { res });
        router.push("/auth/code");
      })
      .catch((err: AxiosError) => {
        // 300-500
        console.log("Server Error: ", { err: err.response });
        setTitle("Credenciales inválidas");
        setBody(err.response?.data.msg);
        setIsOpen(true);
      })
      .finally(() => setIsBusy(false));
  };

  const modalCleanup = () => {
    setIsOpen(false);
    setBody("");
    setTitle("");
  };

  const schema = Yup.object({
    username: Yup.string()
      .required("Este campo es obligatorio.")
      .min(4, "El username debe tener 4 carateres como mínimo."),
    password: Yup.string()
      .required("Este campo es obligatorio.")
      .min(8, "La contraseña debe tener 8 caracteres como mínimo."),
  });

  return (
    <section className="centerOnScreenCol">
      <ValarModal
        title={title}
        body={body}
        okText={"OK"}
        isOpen={isOpen}
        onConfirm={modalCleanup}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={signIn}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={false}
        validationSchema={schema}
      >
        {(props: FormikProps<SignInFormValues>) => (
          <form
            onSubmit={props.handleSubmit}
            className="w-responsive centerColStretchHorizontally"
          >
            <input
              name="username"
              className="valarInput"
              type="text"
              placeholder="Username"
              value={props.values.username}
              onChange={props.handleChange}
            />
            {props.errors.username && (
              <div className="centered valarInputError">
                {props.errors.username}
              </div>
            )}
            <input
              name="password"
              className="valarInput"
              type="password"
              placeholder="Password"
              value={props.values.password}
              onChange={props.handleChange}
            />
            {props.errors.password && (
              <div className="centered valarInputError">
                {props.errors.password}
              </div>
            )}
            <ValarButton
              className="my-2"
              type="submit"
              text="Sign In"
              disabled={isBusy || !props.isValid}
            />
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ValarSignIn;
