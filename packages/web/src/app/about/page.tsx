import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — CV Builder",
  description:
    "Learn more about CV Builder, the open-source CV evaluation and tailoring tool by Tech Immigrants.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col px-4 py-16 sm:px-6 lg:py-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          About CV Builder
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--color-text-secondary)]">
          An open-source tool that helps tech professionals tailor their CVs for
          specific roles — fast, private, and without the noise.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 space-y-10">
        {/* Why */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Why we built it
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            Every job application is different. The same CV that lands an interview at one
            company gets ignored at another — not because you're unqualified, but because
            your CV wasn't tailored to the role.
          </p>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            AI screening tools and ATS systems now parse every submission. Generic CVs with
            buzzwords get filtered out before a human reads them. CV Builder gives you instant,
            actionable feedback so you can adjust your CV for each opportunity.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            How it works
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-[var(--color-text-secondary)]">
            <li>
              <span className="font-medium text-[var(--color-text-primary)]">
                Paste your CV
              </span>{" "}
              — plain text or markdown, no special format needed.
            </li>
            <li>
              <span className="font-medium text-[var(--color-text-primary)]">
                Optionally add a job description
              </span>{" "}
              — the engine scores keyword alignment and identifies gaps.
            </li>
            <li>
              <span className="font-medium text-[var(--color-text-primary)]">
                Get scored across 6 dimensions
              </span>{" "}
              — shipped evidence, quantified impact, tooling visibility, ATS
              compatibility, keyword match, and public proof.
            </li>
            <li>
              <span className="font-medium text-[var(--color-text-primary)]">
                Review issues and suggestions
              </span>{" "}
              — each flagged problem includes a reason and a concrete fix.
            </li>
          </ol>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Privacy-first
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            All evaluation happens in your browser. Your CV text is never sent to a server,
            stored, or logged. There are no accounts, no sign-ups, and no tracking. The
            core engine runs on static pattern matching — no AI API calls, no data leaks.
          </p>
        </section>

        {/* Tech */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Built for the community
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            CV Builder is 100% open source under the MIT License. The project is organized
            as a monorepo with three packages:
          </p>
         
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            Contributions, bug reports, and feature requests are welcome on{" "}
            <a
              href="https://github.com/TechImmigrants/cv-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-brand-500)] underline transition-colors hover:text-[var(--color-brand-600)]"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Maintained by Tech Immigrants
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
            A community of tech professionals building tools that make the job search
            process more transparent, fair, and effective. We believe your CV should
            represent your actual skills — not your ability to game an ATS.
          </p>
        </section>

        {/* Back link */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand-500)] transition-colors hover:text-[var(--color-brand-600)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}