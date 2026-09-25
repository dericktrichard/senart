import Link from "next/link";

import { formatCurrency, formatDate, type Job } from "@/lib/jobs";

import styles from "./job-card.module.css";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category}>{job.category}</span>
        <span className={styles.date}>{formatDate(job.postedAt)}</span>
      </div>

      <div className={styles.body}>
        <h2>{job.title}</h2>
        <p>{job.description}</p>
      </div>

      <div className={styles.bottom}>
        <span className={styles.budget}>
          {formatCurrency(job.budget)}
        </span>

        <span className={styles.deadline}>
          Due {formatDate(job.deadline)}
        </span>

        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}