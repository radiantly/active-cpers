import Head from "next/head";
import Link from "./Link.js";
import styles from "../styles/Home.module.css";

export default function MainContainer(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Active CPers{props.title ? ` - ${props.title}` : null}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600&display=swap" />
      </Head>
      <h1>Active CPers</h1>
      <div className={styles.navbar}>
        <Link href="/">[Home]</Link>
        <Link href="/members">[Members]</Link>
        <Link href="/calendar">[Calendar]</Link>
        <Link href="/join">[Join Us]</Link>
      </div>
      {props.children}
    </div>
  );
}
