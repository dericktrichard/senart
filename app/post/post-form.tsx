"use client";

import { FormEvent, useState } from "react";

import styles from "./post.module.css";

const CATEGORIES = [
  "Writing & editing",
  "Graphic design",
  "Data entry & spreadsheets",
  "Research",
  "Virtual assistance",
  "Presentations",
  "Transcription",
  "Website & software",
  "Social media",
  "Document & admin",
];

export function PostForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successLabel}>READY</span>

        <h2>Job details ready.</h2>

        <p>Review your job before publishing it on Senart.</p>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setSubmitted(false)}
        >
          Edit job
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span>Job details</span>
        <span>01</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="title">What do you need done?</label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Clean up an Excel spreadsheet"
            maxLength={100}
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a category
            </option>

            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            placeholder="What should the finished work include?"
            rows={4}
            maxLength={3000}
            required
          />

          <span className={styles.hint}>
            Include anything the worker needs to know.
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.split}>
          <div className={styles.field}>
            <label htmlFor="budget">Budget</label>

            <div className={styles.moneyInput}>
              <span>KES</span>

              <input
                id="budget"
                name="budget"
                type="number"
                min="100"
                step="50"
                placeholder="5,000"
                inputMode="numeric"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="deadline">Deadline</label>

            <input
              id="deadline"
              name="deadline"
              type="date"
              required
            />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.contactFields}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">
              Phone <span>· optional</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+254 7XX XXX XXX"
              autoComplete="tel"
            />
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <span>Review before publishing.</span>

        <button type="submit" className={styles.submitButton}>
          <span>Review job</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}