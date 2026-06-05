"use client";

import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-zinc-900 dark:text-white">
            CV Builder
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}