"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { EvaluationResult } from "@cv-builder/core";
import { FeatureCards } from "@/components/FeatureCards";
import { EvaluationResults } from "@/components/EvaluationResults";

export default function HomePage() {
  // Form state
  const [cvText, setCvText] = useState("");
  const [jdText, setJdText] = useState("");
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [jdFileName, setJdFileName] = useState<string | null>(null);
  const [showJd, setShowJd] = useState(false);

  // Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const cvFileRef = useRef<HTMLInputElement>(null);
  const jdFileRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // File handlers
  const handleCvFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCvText(ev.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  const handleJdFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setJdFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setJdText(ev.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  const handleDropCv = useCallback(
    async (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      setCvFileName(file.name);
      setCvText(await file.text());
    },
    [],
  );

  const handleDropJd = useCallback(
    async (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      setJdFileName(file.name);
      setJdText(await file.text());
    },
    [],
  );

  // Evaluate
  const handleEvaluate = useCallback(async () => {
    if (!cvText.trim()) return;

    setIsEvaluating(true);
    setError(null);
    setResult(null);

    try {
      const { evaluate } = await import("@cv-builder/core");
      const res = await evaluate({
        cv: { content: cvText, format: "markdown" },
        jd: jdText.trim()
          ? { content: jdText }
          : undefined,
      });
      setResult(res);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Evaluation failed unexpectedly",
      );
    } finally {
      setIsEvaluating(false);
    }
  }, [cvText, jdText]);

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const clearAll = useCallback(() => {
    setCvText("");
    setJdText("");
    setCvFileName(null);
    setJdFileName(null);
    setResult(null);
    setError(null);
  }, []);

  return (
    <section className="mx-auto flex max-w-5xl flex-col px-4 py-12 sm:px-6 lg:py-16">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
          Tailor your CV for{" "}
          <span className="text-[var(--color-brand-500)]">any job</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)]">
          Paste your CV, and  get instant scoring and actionable suggestions.
        </p>
      </div>

      {/* ─── CV Input ─────────────────────────────────── */}
      <div className="mt-12">
        <label className="mb-2 flex items-center justify-between text-sm font-medium text-[var(--color-text-primary)]">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--color-brand-500)] text-xs font-bold text-white">
              1
            </span>
            Your CV / Resume
          </span>
          {cvFileName && (
            <span className="text-xs text-[var(--color-text-secondary)]">
              {cvFileName}
            </span>
          )}
        </label>
        <p className="mb-1 text-xs text-[var(--color-text-secondary)]">
          Paste your CV directly into the text area below
        </p>
        <p className="mb-3 text-xs text-[var(--color-text-secondary)]">
          Or upload a <code className="rounded bg-[var(--color-surface-tertiary)] px-1">.md</code>,{" "}
          <code className="rounded bg-[var(--color-surface-tertiary)] px-1">.txt</code>, or{" "}
          <code className="rounded bg-[var(--color-surface-tertiary)] px-1">.html</code> file &mdash; drag & drop or click &ldquo;Upload file&rdquo;
        </p>
        <textarea
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          onDrop={handleDropCv}
          onDragOver={(e) => e.preventDefault()}
          placeholder={`Paste your CV here...`}
          className="min-h-[320px] w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-500)]"
          spellCheck={false}
        />
        <div className="mt-2 flex items-center gap-3">
          <input
            ref={cvFileRef}
            type="file"
            accept=".md,.txt,.html,.text"
            onChange={handleCvFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => cvFileRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <UploadIcon />
            Upload file
          </button>
          {cvFileName && (
            <button
              type="button"
              onClick={() => {
                setCvText("");
                setCvFileName(null);
              }}
              className="text-xs text-[var(--color-text-secondary)] underline transition-colors hover:text-[var(--color-text-primary)]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─── JD Toggle ─────────────────────────────────── */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setShowJd(!showJd)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
              showJd
                ? "bg-[var(--color-brand-500)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            }`}
          >
            2
          </span>
          <span>Compare with a Job Description (optional)</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`h-4 w-4 transition-transform ${showJd ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showJd && (
          <div className="mt-4 animate-in slide-in-from-top-2">
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-[var(--color-text-primary)]">
              <span>Job Description</span>
              {jdFileName && (
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {jdFileName}
                </span>
              )}
            </label>
            <p className="mb-3 text-xs text-[var(--color-text-secondary)]">
              Provide the job description to see how well your CV matches — the engine will score
              keyword alignment and detect your role archetype more accurately.
            </p>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              onDrop={handleDropJd}
              onDragOver={(e) => e.preventDefault()}
              placeholder={`Paste the job description here...`}
              className="min-h-[200px] w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-500)]"
              spellCheck={false}
            />
            <div className="mt-2 flex items-center gap-3">
              <input
                ref={jdFileRef}
                type="file"
                accept=".md,.txt,.html,.text"
                onChange={handleJdFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => jdFileRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text-primary)]"
              >
                <UploadIcon />
                Upload file
              </button>
              {jdFileName && (
                <button
                  type="button"
                  onClick={() => {
                    setJdText("");
                    setJdFileName(null);
                  }}
                  className="text-xs text-[var(--color-text-secondary)] underline transition-colors hover:text-[var(--color-text-primary)]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── Actions ─────────────────────────────────── */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleEvaluate}
          disabled={!cvText.trim() || isEvaluating}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-500)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <SpinnerIcon />
              Evaluating...
            </>
          ) : (
            "Evaluate CV"
          )}
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          Clear all
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Results — always rendered, hidden until data arrives */}
      <div ref={resultsRef}>
        <EvaluationResults
          result={result}
          jdProvided={jdText.trim().length > 0}
        />
      </div>

      {/* Feature preview cards — always visible */}
      <div className="mt-20">
        <FeatureCards />
      </div>

    </section>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}