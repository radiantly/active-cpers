import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function ActiveLink({ children, href }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={router.pathname === href ? styles.active : styles.inactive}>
        {children}
      </a>
    </Link>
  );
}
