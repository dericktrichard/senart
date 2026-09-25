import Link from "next/link";

import { AtmosphericBackground } from "@/app/components/atmospheric-background";
import { PageHeader } from "@/app/components/page-header";

import { JobCard } from "./job-card";
import { JobSearch } from "./job-search";

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

  const filteredJobs = jobs
    .filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query);

      const matchesCategory =
        !category || job.category === category;

      return matchesQuery && matchesCategory;
    })
    .sort(
      (a, b) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime(),
    );

  return (
    <main className={styles.page}>
      <AtmosphericBackground />

      <div className={styles.shell}>
        <PageHeader
          backHref="/"
          backLabel="Back"
          center={<JobSearch />}
          right={
            <Link href="/post" className={styles.postLink}>
              + Post a job
            </Link>
          }
        />

        <div className={styles.resultsMeta}>
          <span>
            {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? "job" : "jobs"}
          </span>

          <span>
            {category || "Closing soon first"}
          </span>
        </div>

        <section className={styles.results}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {filteredJobs.length === 0 && (
            <div className={styles.empty}>
              <span>No jobs found.</span>

              <Link href="/jobs">
                Clear search
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}