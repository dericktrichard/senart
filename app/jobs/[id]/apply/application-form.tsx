"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./application.module.css";
import { formatDate } from "@/lib/jobs";

const MIN_PROPOSAL_LENGTH = 20;
const MAX_PROPOSAL_LENGTH = 2000;

type ApplicationFormProps = {
  jobId: string;
  deadline: string;
};

export function ApplicationForm({
  jobId,
  deadline,
}: ApplicationFormProps) {
  const [proposal, setProposal] = useState("");
  const [canMeetDeadline, setCanMeetDeadline] = useState<boolean | null>(
    null,
  );
  const [submitted, setSubmitted] = useState(false);

  const proposalLength = proposal.trim().length;

  const isValid =
    proposalLength >= MIN_PROPOSAL_LENGTH &&
    proposalLength <= MAX_PROPOSAL_LENGTH &&
    canMeetDeadline === true;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) return;

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <div>
          <span className={styles.successLabel}>Application submitted</span>

          <h2>Your application is on its way.</h2>

          <p>
            The job poster can now review your proposal. If you&apos;re
            selected, you&apos;ll be notified through Senart.
          </p>
        </div>

        <div className={styles.successActions}>
          <Link href="/jobs" className={styles.secondaryAction}>
            Browse more jobs
          </Link>

          <Link
            href={`/jobs/${jobId}`}
            className={styles.primaryAction}
          >
            Back to job
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <div className={styles.fieldHeader}>
          <label htmlFor="proposal">Your proposal</label>

          <span>
            {proposalLength}/{MAX_PROPOSAL_LENGTH}
          </span>
        </div>

        <textarea
          id="proposal"
          name="proposal"
          value={proposal}
          onChange={(event) => {
            if (event.target.value.length <= MAX_PROPOSAL_LENGTH) {
              setProposal(event.target.value);
            }
          }}
          placeholder="Explain how you'll approach the work..."
          rows={7}
          required
        />

        {proposalLength > 0 &&
          proposalLength < MIN_PROPOSAL_LENGTH && (
            <p className={styles.error}>
              Your proposal needs at least {MIN_PROPOSAL_LENGTH} characters.
            </p>
          )}
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Can you complete this by the deadline?</legend>

        <p className={styles.deadline}>
            The work needs to be completed by{" "}
            <strong>{formatDate(deadline)}</strong>.
        </p>

        <div className={styles.options}>
          <label
            className={`${styles.option} ${
              canMeetDeadline === true ? styles.optionSelected : ""
            }`}
          >
            <input
              type="radio"
              name="deadline"
              checked={canMeetDeadline === true}
              onChange={() => setCanMeetDeadline(true)}
            />
            <span>Yes, I can meet it</span>
          </label>

          <label
            className={`${styles.option} ${
              canMeetDeadline === false ? styles.optionSelected : ""
            }`}
          >
            <input
              type="radio"
              name="deadline"
              checked={canMeetDeadline === false}
              onChange={() => setCanMeetDeadline(false)}
            />
            <span>No, I cannot</span>
          </label>
        </div>

        {canMeetDeadline === false && (
          <p className={styles.error}>
            You need to be able to meet the job deadline to apply.
          </p>
        )}
      </fieldset>

      <div className={styles.footer}>
        <div>
          <span>Application</span>
          <strong>Ready to submit</strong>
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={!isValid}
        >
          Submit application
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}