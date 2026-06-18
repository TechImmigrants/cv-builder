"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { evaluate } from "@cv-builder/core";
import { TextStats } from "./TextStats";
import { saveEvaluationResult } from "../lib/evaluation-storage";
import { FileUpload } from "./FileUpload";

export function EvaluateForm() {
    const router = useRouter();

    const [cv, setCv] = useState("");
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleEvaluate() {
        if (!cv.trim()) {
            alert("Please paste your CV.");
            return;
        }
        

        setLoading(true);

        try {
            const result = await evaluate({
                cv: {
                    content: cv,
                    format: "plaintext",
                },
                jd: {
                    content: jd,
                },
            });

            saveEvaluationResult(result);

            router.push("/results");
        } catch (error) {
            console.error(error);
            alert("Evaluation failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block font-medium">
                        CV
                    </label>

                    <textarea
                        value={cv}
                        onChange={(e) => setCv(e.target.value)}
                        placeholder="Paste your CV here..."
                        className="min-h-[350px] w-full rounded-xl border border-zinc-300 bg-transparent p-4"
                    />

                    <TextStats value={cv} />
                    <FileUpload
                        onContentLoaded={(content) => setCv(content)}
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Job Description
                    </label>

                    <textarea
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="min-h-[350px] w-full rounded-xl border border-zinc-300 bg-transparent p-4"
                    />

                    <TextStats value={jd} />
                    <FileUpload
                        onContentLoaded={(content) => setJd(content)}
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleEvaluate}
                    disabled={loading}
                    className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
                >
                    {loading ? "Evaluating..." : "Evaluate"}
                </button>
            </div>
        </section>
    );
}