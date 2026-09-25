"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { JOB_CATEGORIES } from "@/lib/jobs";

import styles from "./job-filters.module.css";

export function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateFilters(nextQuery: string, category: string) {
    const params = new URLSearchParams();

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    }

    if (category) {
      params.set("category", category);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateFilters(
      query,
      searchParams.get("category") ?? "",
    );
  }

  function handleCategoryChange(value: string) {
    updateFilters(query, value);
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <label htmlFor="job-search">Search jobs</label>

        <input
          id="job-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or skill"
        />

        <button type="submit">Search</button>
      </div>

      <div className={styles.category}>
        <label htmlFor="job-category">Category</label>

        <select
          id="job-category"
          value={searchParams.get("category") ?? ""}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>

          {JOB_CATEGORIES.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}