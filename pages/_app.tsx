import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
