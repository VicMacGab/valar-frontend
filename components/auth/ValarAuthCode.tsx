import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ValarButton from "../general/ValarButton";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import ValarModal from "../general/ValarModal";
import ClientService from "@services/ClientService";
import { AxiosError, AxiosResponse } from "axios";

enum AuthCodeState {
  Valid,
  Incorrect,
  Expired,
  None,
}

const ValarAuthCode: React.FC<{}> = (props) => {
  const router = useRouter();

  const [authCodeState, setAuthCodeState] = useState<AuthCodeState>(
    AuthCodeState.None
  );
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
        setAuthCodeState(AuthCodeState.Valid);
        setModalTitle("¡Autenticado correctamente!");
        setModalBody("Bienvenido a Valar.");
        router.push("/home");
      })
      .catch((err: AxiosError) => {
        console.group("Verify Auth Code Err");
        console.log(err.response);
        console.groupEnd();

        if (err.response?.status == 404) {
          setAuthCodeState(AuthCodeState.Incorrect);
          setModalTitle("Oops!");
          setModalBody("El código es incorrecto. Inténtalo de nuevo.");
        } else if (err.response?.status == 403) {
          setAuthCodeState(AuthCodeState.Expired);
          setModalTitle("Oops!");
          setModalBody("El código expiró. Inténtalo de nuevo.");
        }
        setModalIsOpen(true);
      });
  };

  const modalCleanup = () => {
    setModalIsOpen(false);
    setAuthCodeState(AuthCodeState.None);
    setIsBusy(false);
  };

  const schema = Yup.object({
    authCode: Yup.string()
      .required("Necesitas ingresar el código.")
      .length(4, "El código es de 4 caracteres."),
  });

  const getOkText = (): string => {
    if (
      authCodeState == AuthCodeState.Expired ||
      authCodeState == AuthCodeState.Incorrect
    ) {
      return "OK";
    } else {
      return "Gracias";
    }
  };

  const onConfirm = () => {
    if (authCodeState == AuthCodeState.Expired) {
      router.push("/");
    } else if (authCodeState == AuthCodeState.Valid) {
      router.push("/home");
    }
    modalCleanup();
  };

  return (
    <>
      <ValarModal
        isOpen={modalIsOpen}
        title={modalTitle}
        body={modalBody}
        okText={getOkText()}
        onConfirm={onConfirm}
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
              className="my-2"
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
