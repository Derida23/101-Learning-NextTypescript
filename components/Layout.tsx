import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./Layout.module.scss";

type LayoutProps = {
  title?: string;
};
// const layoutStyle = {
//   margin: 20,
//   padding: 20,
//   border: '1px solid #DDD'
// }

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header className={styles.header}>
      <Link href="/">
        <img src="/assets/logo.png" alt="logo" />
      </Link>
    </header>
    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      Arian Derida @ Fullstack Developer - Test Vascomm 2021
    </footer>
  </div>
);
export default Layout;
