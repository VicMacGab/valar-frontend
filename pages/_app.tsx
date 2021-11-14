import ValarHeader from "@components/ValarHeader";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";

//console.log('%c ¡Cuidado!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
//console.log('%c ¡Si alguien te dijo pegar algún código acá, te quiere hackear! Te lo decimos desde el equipo de Valar.', 'font-weight: bold; font-size: 20px;color: red;');

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  return (
    <>
      {router.pathname != "/" && <ValarHeader />}
      <div className="margin-top-80">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
