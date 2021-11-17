import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ValarButton from "./ValarButton";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import ValarModal from "./ValarModal";
import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";

const ValarAuthCode: React.FC<{}> = (props) => {
  const router = useRouter();

  const [authCodeExpired, setAuthCodeExpired] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const sendAuthCode = (values: { authCode: string }) => {
    setIsBusy(true);
    console.log("send auth code");

    ClientService.verifyAuthCode(+values.authCode)
      .then((res: AxiosResponse) => {
        console.group("Verify Auth Code Res");
        console.log(res);
        console.groupEnd();
        setAuthCodeExpired(false);
        setModalTitle("¡Autenticado correctamente!");
        setModalBody("Bienvenido a Valar.");
      })
      .catch((err: AxiosError) => {
        console.group("Verify Auth Code Err");
        console.log(err.response);
        console.groupEnd();
        setAuthCodeExpired(true);
        setModalTitle("Oops!");
        setModalBody("El código expiró. Inténtalo de nuevo.");
      })
      .finally(() => setModalIsOpen(true));
  };

  const goHome = () => {
    router.push("/home");
    modalCleanup();
  };

  const goBack = () => {
    router.push("/");
    modalCleanup();
  };

  const modalCleanup = () => {
    setModalIsOpen(false);
    setAuthCodeExpired(false);
    setIsBusy(false);
  };

  const schema = Yup.object({
    authCode: Yup.string()
      .required("Necesitas ingresar el código.")
      .length(4, "El código es de 4 caracteres."),
  });

  return (
    <>
      <ValarModal
        isOpen={modalIsOpen}
        title={modalTitle}
        body={modalBody}
        okText={authCodeExpired ? "OK" : "Gracias"}
        onConfirm={() => (authCodeExpired ? goBack() : goHome())}
      />
      <h1 className="bold">¡Revisa tu correo!</h1>
      <h4>Ingresa el código que te llegó a tu correo:</h4>
      <Formik
        initialValues={{ authCode: "" }}
        onSubmit={sendAuthCode}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={false}
        validationSchema={schema}
      >
        {(props: FormikProps<{ authCode: string }>) => (
          <form onSubmit={props.handleSubmit} className="centeredCol">
            <input
              name="authCode"
              className="valarInput text-center"
              type="text"
              maxLength={4}
              value={props.values.authCode}
              onChange={props.handleChange}
            />
            {props.errors.authCode && (
              <div className="centered valarInputError">
                {props.errors.authCode}
              </div>
            )}
            <ValarButton
              text="Enviar"
              type="submit"
              disabled={!props.isValid || isBusy}
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default ValarAuthCode;
