import Link from "next/link";

import styles from "./page-header.module.css";

type PageHeaderProps = {
  backHref: string;
  backLabel: string;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export function PageHeader({
  backHref,
  backLabel,
  center,
  right,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href={backHref} className={styles.back}>
        <span aria-hidden="true">←</span>
        <span>{backLabel}</span>
      </Link>

      <div className={styles.center}>
        {center}
      </div>

      <div className={styles.right}>
        {right}
      </div>
    </header>
  );
}