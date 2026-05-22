/**
 * Application footer with links and attribution.
 * Minimal, centered layout that works on all screen sizes.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        {/* Attribution */}
        <p className="text-sm text-[var(--color-text-secondary)]">
          &copy; {currentYear}{" "}
          <a
            href="https://github.com/TechImmigrants/cv-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-brand-500)]"
          >
            CV Builder
          </a>
          . Open source under the MIT License.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/TechImmigrants/cv-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            GitHub
          </a>
          <a
            href="https://github.com/TechImmigrants/cv-builder/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            Issues
          </a>
        </div>
      </div>
    </footer>
  );
}