/**
 * Feature preview cards shown on the home page.
 * Describes the core capabilities of CV Builder.
 */
export function FeatureCards() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[var(--color-surface-tertiary)] dark:text-[var(--color-brand-400)]">
            {feature.icon}
          </div>
          <h3 className="mt-4 font-semibold text-[var(--color-text-primary)]">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {feature.description}
          </p>
        </article>
      ))}
    </div>
  );
}

const features = [
  {
    title: "Instant Scoring",
    description:
      "Get a score across 6 key dimensions: shipped evidence, quantified impact, tooling visibility, ATS compatibility, keyword match, and public proof.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Rewrite Suggestions",
    description:
      "Receive targeted, actionable rewrites for every weak point — from weak bullet points to missing keywords.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    title: "Privacy First",
    description:
      "All scoring runs locally in your browser. No sign-up, no account, no data sent to a server. Your CV stays yours.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];