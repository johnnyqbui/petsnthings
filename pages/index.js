import Head from "next/head";
import styles from "../styles/Home.module.css";

import Home from "./Home";

export default () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pets N' Things</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};
