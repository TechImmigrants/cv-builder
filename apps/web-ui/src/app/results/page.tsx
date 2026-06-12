"use client";

import { useEffect, useState } from "react";
import { getEvaluationResult } from "../lib/evaluation-storage";
import { ScoreCard } from "../components/ScoreCard";

export default function ResultsPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = getEvaluationResult();

        setResult(data);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <main className="p-8">
                Loading...
            </main>
        );
    }

    if (!result) {
        return (
            <main className="p-8">
                No evaluation found
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl p-8">
            <h1 className="mb-8 text-4xl font-bold">
                Evaluation Results
            </h1>

            <ScoreCard score={result.score} />

            <section className="mt-8 rounded-2xl border p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    Strengths
                </h2>

                <ul className="space-y-2">
                    {result.strengths.map(
                        (strength: string, index: number) => (
                            <li key={index}>
                                • {strength}
                            </li>
                        )
                    )}
                </ul>
            </section>

            <section className="mt-8 rounded-2xl border p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    Dimensions
                </h2>

                {result.dimensions.map(
                    (dimension: any, index: number) => (
                        <div
                            key={index}
                            className="mb-3 rounded-xl border p-4"
                        >
                            <div className="flex justify-between">
                                <span>
                                    {dimension.name}
                                </span>

                                <span>
                                    {dimension.score}
                                    /
                                    {dimension.maxScore}
                                </span>
                            </div>
                        </div>
                    )
                )}            </section>
        </main>
    );
}