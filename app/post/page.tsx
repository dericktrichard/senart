import Link from "next/link";

import { PostForm } from "./post-form";

import styles from "./post.module.css";

export default function PostPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Senart</span>
          </Link>

          <span className={styles.step}>POST A JOB</span>
        </header>

        <section className={styles.content}>
          <aside className={styles.intro}>
            <div className={styles.introCopy}>
              <p className={styles.eyebrow}>Post a job</p>

              <h1>What needs doing?</h1>

              <p className={styles.description}>
                Describe the work,<br/> set your budget, <br/> and we&apos;ll take it from there.
              </p>
            </div>

            <div className={styles.account}>
              <div className={styles.accountActions}>
                <Link href="/register" className={styles.accountButton}>
                  <span>Create an account</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <span className={styles.accountLabel}>
                Have an account?:              
                <Link href="/login" className={styles.loginLink}>
                  SIGN IN
                </Link>
              </span>

            </div>
          </aside>

          <div className={styles.formPanel}>
            <PostForm />
          </div>
        </section>
      </div>
    </main>
  );
}