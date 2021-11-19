import { useState } from "react";
import ValarButton from "./ValarButton";
import { AxiosError, AxiosResponse } from "axios";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import ClientService from "services/ClientService";
interface SignInFormValues {
  username: string;
  password: string;
}

const ValarSignIn: React.FC<any> = (props) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

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
      })
      .finally(() => setIsBusy(false));
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
