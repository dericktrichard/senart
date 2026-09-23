import Link from "next/link";

import styles from "./action-card.module.css";

type ActionCardProps = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export function ActionCard({
  number,
  title,
  description,
  href,
}: ActionCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.number}>{number}</span>

      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <span className={styles.arrow} aria-hidden="true">
        →
      </span>

      <span className={styles.orbit} aria-hidden="true" />
    </Link>
  );
}