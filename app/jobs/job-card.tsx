import Link from "next/link";

import {
  daysUntil,
  formatCurrency,
  formatDate,
  type Job,
} from "@/lib/jobs";

import styles from "./job-card.module.css";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const remaining = daysUntil(job.deadline);

  const urgency =
    remaining <= 2
      ? "urgent"
      : remaining <= 4
        ? "soon"
        : "normal";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={styles.card}
      style={
        {
          "--job-image": `url("${job.image}")`,
        } as React.CSSProperties
      }
    >
      <div className={styles.image} aria-hidden="true" />

      <div className={styles.tab}>
        {job.category}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>Posted {formatDate(job.postedAt)}</span>
          <span>{remaining}d left</span>
        </div>

        <h2 title={job.title}>{job.title}</h2>

        <div className={styles.bottom}>
          <strong>{formatCurrency(job.budget)}</strong>

          <span
            className={`${styles.deadline} ${styles[urgency]}`}
          >
            {remaining <= 0
              ? "Closing"
              : remaining === 1
                ? "1 day"
                : `${remaining} days`}
          </span>
        </div>
      </div>

      <div
        className={`${styles.urgency} ${styles[urgency]}`}
        aria-hidden="true"
      />
    </Link>
  );
}