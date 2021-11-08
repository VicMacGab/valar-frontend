import ValarHeader from "@components/ValarHeader";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";

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
