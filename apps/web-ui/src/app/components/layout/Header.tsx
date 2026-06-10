"use client";

import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            CV Builder
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
