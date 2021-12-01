import ValarButton from "../general/ValarButton";
import { AxiosError, AxiosResponse } from "axios";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import ClientService from "services/ClientService";
import { useState } from "react";
import ValarModal from "../general/ValarModal";
interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const ValarSignUp: React.FC<any> = (props) => {
  const [isBusy, setIsBusy] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const router = useRouter();

  const signUp = (
    formValues: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    setIsBusy(true);
    console.log("user sign up", {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    });

    ClientService.signUp({
      username: formValues.username,
      email: formValues.email,
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
        setModalTitle("¡Ocurrió un conflicto!");
        setModalBody(err.response?.data.msg);
        setModalIsOpen(true);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const schema = Yup.object({
    username: Yup.string()
      .required("Este campo es obligatorio.")
      .min(4, "El username debe tener 4 carateres como mínimo."),
    email: Yup.string()
      .required("Este campo es obligatorio.")
      .email("Debe ser un email válido."),
    password: Yup.string()
      .required("Este campo es obligatorio.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número."
      ),
  });

  return (
    <section className="centerOnScreenCol">
      <ValarModal
        isOpen={modalIsOpen}
        title={modalTitle}
        body={modalBody}
        okText={"OK"}
        onConfirm={() => setModalIsOpen(false)}
      />
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={signUp}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={false}
        validationSchema={schema}
      >
        {(props: FormikProps<SignUpFormValues>) => (
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
              name="email"
              className="valarInput"
              type="email"
              placeholder="Email"
              value={props.values.email}
              onChange={props.handleChange}
            />
            {props.errors.email && (
              <div className="centered valarInputError">
                {props.errors.email}
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
              text="Sign Up"
              disabled={isBusy}
            />
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ValarSignUp;
