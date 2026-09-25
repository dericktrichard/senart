"use client";

import { FormEvent, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { JOB_CATEGORIES } from "@/lib/jobs";

import styles from "./job-search.module.css";

export function JobSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(
    searchParams.get("q") ?? "",
  );

  const category = searchParams.get("category") ?? "";

  function applyFilters(
    nextQuery: string,
    nextCategory: string,
  ) {
    const params = new URLSearchParams();

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    }

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    const next = params.toString();

    router.push(next ? `${pathname}?${next}` : pathname);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    applyFilters(query, category);
  }

  function changeCategory(value: string) {
    applyFilters(query, value);
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.trigger} ${
          open ? styles.triggerOpen : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="job-search-panel"
      >
        <span aria-hidden="true">⌕</span>
        Search
      </button>

      <div
        id="job-search-panel"
        className={`${styles.panel} ${
          open ? styles.panelOpen : ""
        }`}
      >
        <form className={styles.form} onSubmit={submit}>
          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search jobs, skills or categories"
            aria-label="Search jobs"
            autoComplete="off"
          />

          <select
            value={category}
            onChange={(event) =>
              changeCategory(event.target.value)
            }
            aria-label="Filter by category"
          >
            <option value="">All categories</option>

            {JOB_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}