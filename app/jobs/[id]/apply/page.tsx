import Link from "next/link";
import { notFound } from "next/navigation";
import { AtmosphericBackground } from "@/app/components/atmospheric-background";
import {
  formatCurrency,
  formatDate,
  getJobById,
} from "@/lib/jobs";
import { ApplicationForm } from "./application-form";
import styles from "./application.module.css";

type ApplyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplyPage({ params }: ApplyPageProps) {
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
          <Link href={`/jobs/${job.id}`} className={styles.back}>
            <span aria-hidden="true">←</span>
            <span>Back to job</span>
          </Link>

          <Link href="/post" className={styles.post}>
            + Post a job
          </Link>
        </header>

        <section className={styles.layout}>
          <aside className={styles.context}>
            <div>
              <span className={styles.eyebrow}>Applying for</span>

              <h1>{job.title}</h1>

              <span className={styles.category}>{job.category}</span>
            </div>

            <div className={styles.jobMeta}>
              <div>
                <span>Budget</span>
                <strong>{formatCurrency(job.budget)}</strong>
              </div>

              <div>
                <span>Deadline</span>
                <strong>{formatDate(job.deadline)}</strong>
              </div>
            </div>
          </aside>

          <div className={styles.formPanel}>
            <div className={styles.heading}>
              <span className={styles.eyebrow}>Application</span>

              <h2>Tell them why you&apos;re a good fit.</h2>

              <p>
                Explain how you&apos;ll approach the work and anything relevant
                to completing it.
              </p>
            </div>

            <ApplicationForm
              jobId={job.id}
              deadline={job.deadline}
            />
          </div>
        </section>
      </div>
    </main>
  );
}