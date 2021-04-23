import "../styles/globals.css";
import "antd/dist/antd.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/fav.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
