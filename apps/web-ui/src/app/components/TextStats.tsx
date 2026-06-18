interface TextStatsProps {
    value: string;
}

export function TextStats({ value }: TextStatsProps) {
    const trimmed = value.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;

    const characters = value.length;

    return (
        <p className="mt-2 text-sm text-zinc-500">
            {characters} chars • {words} words
        </p>
    );
}