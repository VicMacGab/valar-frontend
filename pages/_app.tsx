import ValarHeader from "@components/general/ValarHeader";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { styletron } from "@utils/general/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, createTheme } from "baseui";
import { useEffect } from "react";
import Head from "next/head";

// TODO: ponerle limite de caracteres al username, password e email para evitar un DoS

const valarTheme = createTheme({
  primary: "#8b1a10",
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.warn(
      "%c ¡Cuidado!",
      "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
    );
    console.warn(
      "%c ¡Si alguien te dijo que pegues algún código acá, te quiere hackear! Te lo decimos desde el equipo de Valar.",
      "font-weight: bold; font-size: 20px;color: red;"
    );
  }, []);

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={valarTheme}>
        <Head>
          <title>Valar</title>
          <meta
            name="description"
            content="World's most awesome and secure chat."
          />
          {/* TODO: poner los og tags para los embeds */}
          <link rel="icon" href="/favicon.png" />
        </Head>
        {router.pathname != "/" && <ValarHeader className="bgTertiary" />}
        <div className="tertiaryBackground">
          <Component {...pageProps} />
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default MyApp;
