"use client";

import type {
  EvaluationResult,
  EvaluationDimension,
} from "@cv-builder/core";

/**
 * Evaluation results display — score overview, dimensions, strengths, issues, rewrites.
 * All HTML is always rendered but hidden until result data is provided.
 */
export function EvaluationResults({
  result,
  jdProvided,
}: {
  result: EvaluationResult | null;
  jdProvided: boolean;
}) {
  const r = result;

  return (
    <div className={`mt-16 w-full space-y-10 ${!r ? "hidden" : ""}`}>
      {/* Overall score */}
      <div className="text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-6 shadow-sm">
          <div className="text-left">
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">
              Overall Score
            </p>
            <p className="text-5xl font-bold text-[var(--color-text-primary)]">
              {r ? r.score.toFixed(1) : "--"}
              <span className="text-2xl text-[var(--color-text-secondary)]">
                /5
              </span>
            </p>
          </div>
          <div className="h-16 w-px bg-[var(--color-border)]" />
          <div className="text-left">
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">
              Archetype
            </p>
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">
              {r ? r.archetype.name : "—"}
            </p>
          </div>
          {jdProvided && (
            <>
              <div className="h-16 w-px bg-[var(--color-border)]" />
              <div className="text-left">
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  ATS Compatible
                </p>
                <p
                  className={`text-lg font-semibold ${
                    r?.atsCompatible
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {r ? (r.atsCompatible ? "✓ Yes" : "✗ No") : "—"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dimension scores */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Scores by Dimension
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r
            ? r.dimensions.map((dim) => (
                <DimensionCard key={dim.name} dimension={dim} />
              ))
            : // Empty placeholder cards
              Array.from({ length: 6 }).map((_, i) => (
                <DimensionCardPlaceholder key={i} />
              ))}
        </div>
      </div>

      {/* Strengths */}
      <div className={!r?.strengths?.length ? "hidden" : ""}>
        <h2 className="mb-3 text-lg font-semibold text-green-700 dark:text-green-400">
          Strengths
        </h2>
        <ul className="space-y-2">
          {r?.strengths.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
            >
              <span className="mt-0.5 shrink-0">✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Issues */}
      <div className={!r?.issues?.length ? "hidden" : ""}>
        <h2 className="mb-3 text-lg font-semibold text-amber-700 dark:text-amber-400">
          Issues Found
        </h2>
        <div className="space-y-3">
          {r?.issues.map((issue, i) => {
            const severityColors = {
              critical:
                "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
              major:
                "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
              minor:
                "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
            };
            return (
              <div
                key={i}
                className={`rounded-lg border p-4 ${severityColors[issue.severity]}`}
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium">{issue.element}</p>
                  <span className="shrink-0 rounded bg-white/50 px-2 py-0.5 text-xs capitalize dark:bg-black/20">
                    {issue.severity}
                  </span>
                </div>
                <p className="mt-1 text-sm opacity-80">{issue.why}</p>
                <p className="mt-1.5 text-sm font-medium">
                  Fix:{" "}
                  <span className="font-normal opacity-80">{issue.fix}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewrites */}
      <div className={!r?.rewrites?.length ? "hidden" : ""}>
        <h2 className="mb-3 text-lg font-semibold text-[var(--color-brand-700)] dark:text-[var(--color-brand-400)]">
          Suggested Rewrites
        </h2>
        <div className="space-y-4">
          {r?.rewrites.map((rw, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--color-border)] p-4"
            >
              <div className="rounded bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-300">
                <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                  Original
                </span>
                <p className="mt-1 whitespace-pre-wrap">{rw.original}</p>
              </div>
              <div className="mt-2 rounded bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-300">
                <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                  Improved
                </span>
                <p className="mt-1 whitespace-pre-wrap">{rw.improved}</p>
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                {rw.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Archetype details */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4">
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">
            Archetype details: {r ? r.archetype.name : "—"}
          </summary>
          <div className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p>{r?.archetype.description}</p>
            <div>
              <span className="font-medium text-[var(--color-text-primary)]">
                Keywords tracked:
              </span>{" "}
              {r?.archetype.keywords.join(", ")}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

// ─── Dimension card ──────────────────────────────────────────────────

function DimensionCard({ dimension }: { dimension: EvaluationDimension }) {
  const pct = (dimension.score / dimension.maxScore) * 100;

  const colorClass =
    pct >= 80
      ? "bg-green-500"
      : pct >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {dimension.name}
        </p>
        <span className="text-sm font-bold text-[var(--color-text-primary)]">
          {dimension.score}/{dimension.maxScore}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-tertiary)]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {dimension.feedback && (
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          {dimension.feedback}
        </p>
      )}
    </div>
  );
}

/** Placeholder skeleton cards while no result is loaded */
function DimensionCardPlaceholder() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <p className="h-4 w-28 animate-pulse rounded bg-[var(--color-surface-tertiary)]">
          &nbsp;
        </p>
        <span className="h-4 w-10 animate-pulse rounded bg-[var(--color-surface-tertiary)]">
          &nbsp;
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-tertiary)]">
        <div className="h-full w-0 rounded-full bg-[var(--color-surface-tertiary)]" />
      </div>
    </div>
  );
}