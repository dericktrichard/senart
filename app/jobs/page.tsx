import Link from "next/link";

import { AtmosphericBackground } from "@/app/components/atmospheric-background";
import { JobCard } from "./job-card";
import { JobFilters } from "./job-filters";

import { jobs } from "@/lib/jobs";

import styles from "./jobs.module.css";

type JobsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const params = await searchParams;

  const query = params.q?.trim().toLowerCase() ?? "";
  const category = params.category ?? "";

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query);

    const matchesCategory =
      !category || job.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <main className={styles.page}>
      <AtmosphericBackground />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            Senart
          </Link>

          <div className={styles.headerActions}>
            <Link href="/post" className={styles.postLink}>
              Post a job
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <section className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Remote marketplace</p>

            <h1>Find something worth doing.</h1>
          </div>

          <p className={styles.description}>
            Browse remote work posted by people who need something done.
          </p>
        </section>

        <section className={styles.marketplace}>
          <JobFilters />

          <div className={styles.resultsHeader}>
            <span>
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "job" : "jobs"}
            </span>

            {category && <span>{category}</span>}
          </div>

          <div className={styles.results}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className={styles.empty}>
                <span>00</span>
                <h2>Nothing found.</h2>
                <p>
                  Try another search or browse all available jobs.
                </p>

                <Link href="/jobs">Clear filters</Link>
              </div>
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Remote work. Kenya first.</span>
          <span>© {new Date().getFullYear()} Senart</span>
        </footer>
      </div>
    </main>
  );
}