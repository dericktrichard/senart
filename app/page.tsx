import Link from "next/link";
import { ActionCard } from "./components/action-card";
import { AtmosphericBackground } from "./components/atmospheric-background";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <AtmosphericBackground />

      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo} aria-label="Senart home">
            SENART
          </Link>

          <Link href="/donate" className={styles.donate}>
            Donate
          </Link>
        </header>

        <section className={styles.hero}>
          <div className={styles.intro}>
            <p>Remote work marketplace</p>

            <h1>What are you here to do?</h1>
          </div>

          <div className={styles.actions}>
            <ActionCard
              number="01"
              title="Post a job"
              description="Need something done remotely?"
              href="/post"
            />

            <ActionCard
              number="02"
              title="Find a job"
              description="Have the skills?"
              href="/jobs"
            />
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Senart</span>

          <span>Work that can happen anywhere.</span>
        </footer>
      </div>
    </main>
  );
}