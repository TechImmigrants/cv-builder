import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CV Builder — Tailor your resume for any job",
  description:
    "Paste a job description, get a tailored CV. Privacy-first, no account required.",
  keywords: [
    "CV",
    "resume",
    "job",
    "ATS",
    "tailor",
    "open source",
  ],
  authors: [{ name: "Tech Immigrants" }],
  openGraph: {
    title: "CV Builder",
    description:
      "Paste a job description, get a tailored CV. Privacy-first, no account required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Inline script to apply dark class before React hydrates.
          Checks localStorage first, falls back to system preference.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('cv-builder-theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}