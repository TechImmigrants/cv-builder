interface ScoreCardProps {
    score: number;
}

export function ScoreCard({
    score,
}: ScoreCardProps) {
    if (typeof score !== 'number' || !isFinite(score) || score < 0) {
        console.warn('ScoreCard received invalid score:', score);
        score = 0;
    }
    const percentage = Math.min(
        100,
        (score / 5) * 100
    );

    return (
        <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
                Overall Score
            </h2>

            <p className="mt-4 text-5xl font-bold">
                {score}
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200">
                <div
                    className="h-full bg-zinc-900"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}