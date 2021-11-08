import { useState } from "react";
import ValarButton from "./ValarButton";
import axios, { AxiosError, AxiosResponse } from "axios";
import CommonService from "services/CommonService";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const ValarSignUp: React.FC<any> = (props) => {
  const router = useRouter();

  const signUp = (
    formValues: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>
  ) => {
    console.log("user sign up", {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    });

    axios
      .post(CommonService.signUpUrl, {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      })
      .then((res: AxiosResponse) => {
        // 200-299
        console.log("Server Response: ", { res });
        router.push("/home");
      })
      .catch((err: AxiosError) => {
        // 300-500
        console.log("Server Error: ", { err });
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
      .min(6, "La contraseña debe tener 6 caracteres como mínimo."),
  });

  return (
    <section className="centerOnScreenCol">
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
              type="submit"
              text="Sign Up"
              // disabled={props.isValid}
            />
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ValarSignUp;