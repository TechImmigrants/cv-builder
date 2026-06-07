export default function Home() {
  return (
    <main className="flex flex-1 bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10 sm:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            CV Builder
          </p>
          <div className="mt-4 max-w-3xl space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Tailor your resume to the role without starting from scratch.
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Paste a job description, highlight the experience that matters, and shape a
              cleaner CV for tech roles in a few quick steps.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <h2 className="text-lg font-semibold">1. Paste the job post</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Start with the exact role description so the app can focus the CV around the
              right skills, tools, and experience.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <h2 className="text-lg font-semibold">2. Shape the story</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              Refine summaries, impact statements, and project bullets to match the role
              while keeping your background clear and honest.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <h2 className="text-lg font-semibold">3. Export a focused CV</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              End with a cleaner resume that is easier to review and more aligned with the
              position you are targeting.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-dashed border-zinc-300 p-8 dark:border-zinc-700">
          <p className="max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
            This starter page is intentionally simple. It gives the web package an
            app-specific home screen instead of the default Next.js template and leaves
            room for the real workflow to grow from here.
          </p>
        </section>
      </div>
    </main>
  );
}
