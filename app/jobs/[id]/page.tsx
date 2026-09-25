import Link from "next/link";
import { notFound } from "next/navigation";

import { AtmosphericBackground } from "@/app/components/atmospheric-background";

import {
  formatCurrency,
  formatDate,
  getJobById,
} from "@/lib/jobs";

import styles from "./job-details.module.css";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JobDetailsPage({
  params,
}: JobDetailsPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <AtmosphericBackground />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/jobs" className={styles.back}>
            <span aria-hidden="true">←</span>
            Browse jobs
          </Link>

          <Link href="/" className={styles.logo}>
            Senart
          </Link>
        </header>

        <div className={styles.content}>
          <section className={styles.main}>
            <div className={styles.meta}>
              <span>{job.category}</span>
              <span>Posted {formatDate(job.postedAt)}</span>
            </div>

            <h1>{job.title}</h1>

            <div className={styles.description}>
              <p>{job.description}</p>

              <p>
                The worker will be expected to communicate through Senart
                and provide the agreed deliverable before the deadline.
              </p>
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Budget</span>
                <strong>{formatCurrency(job.budget)}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Deadline</span>
                <strong>{formatDate(job.deadline)}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Work type</span>
                <strong>Remote</strong>
              </div>
            </div>

            <Link
              href={`/login?next=/jobs/${job.id}`}
              className={styles.apply}
            >
              Apply for this job
              <span aria-hidden="true">→</span>
            </Link>

            <p className={styles.note}>
              You&apos;ll need a Senart account to apply. Browsing jobs does
              not require an account.
            </p>
          </aside>
        </div>

        <footer className={styles.footer}>
          <Link href="/jobs">← Back to jobs</Link>
        </footer>
      </div>
    </main>
  );
}