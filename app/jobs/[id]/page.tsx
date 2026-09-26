import Link from "next/link";
import { notFound } from "next/navigation";
import { AtmosphericBackground } from "@/app/components/atmospheric-background";
import {
  daysUntil,
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

  const remaining = daysUntil(job.deadline);

  const deadlineLabel =
    remaining <= 0
      ? "Closing"
      : remaining === 1
        ? "1 day left"
        : `${remaining} days left`;

  return (
    <main className={styles.page}>
      <AtmosphericBackground />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/jobs" className={styles.back}>
            <span aria-hidden="true">←</span>
            <span>Back to jobs</span>
          </Link>

          <Link href="/post" className={styles.post}>
            + Post a job
          </Link>
        </header>

        <section className={styles.layout}>
          <div className={styles.visual}>
            <img
              src={job.image}
              alt=""
              className={styles.image}
            />

            <div className={styles.imageOverlay}>
              <span>{job.category}</span>
              <span>{deadlineLabel}</span>
            </div>
          </div>

          <article className={styles.content}>
            <div className={styles.heading}>
              <span className={styles.category}>
                {job.category}
              </span>

              <h1>{job.title}</h1>

              <div className={styles.meta}>
                <span>Posted {formatDate(job.postedAt)}</span>
                <span>Deadline {formatDate(job.deadline)}</span>
              </div>
            </div>

            <div className={styles.description}>
              <h2>What needs doing</h2>
              <p>{job.description}</p>
            </div>

            <div className={styles.footer}>
              <div className={styles.budget}>
                <span>Budget</span>
                <strong>{formatCurrency(job.budget)}</strong>
              </div>

              <div className={styles.action}>
                <Link
                  href={`/login?next=/jobs/${job.id}`}
                  className={styles.apply}
                >
                  Apply for this job
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}