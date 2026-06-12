"use client";

import { DragEvent, useRef, useState } from "react";

interface FileUploadProps {
    onContentLoaded: (content: string) => void;
}

export function FileUpload({
    onContentLoaded,
}: FileUploadProps) {
    const [fileName, setFileName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function processFile(file: File) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "";

        if (extension === "txt" || extension === "md") {
            try {
                const text = await file.text();
                onContentLoaded(text);
                setFileName(file.name);
            } catch (error) {
                console.error("Failed to read file:", error);
                alert("Failed to read file. Please try again.");
                setFileName("");
            }
            return;
        }

        if (extension === "pdf") {
            alert(
                "PDF text extraction is not yet supported. Please use .txt or .md files."
            );
            return;
        }

        alert("Unsupported file type.");
    }

    async function handleFiles(files: FileList | null) {
        if (!files?.length) return;

        await processFile(files[0]);
    }

    async function handleDrop(
        event: DragEvent<HTMLDivElement>
    ) {
        event.preventDefault();

        await handleFiles(event.dataTransfer.files);
    }

    return (
        <>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className="mt-4 cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 p-6 text-center transition hover:border-zinc-500"
            >
                <p className="font-medium">
                    Drag & Drop a file here
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                    Supports .txt and .md
                </p>

                {fileName && (
                    <p className="mt-2 text-xs text-green-600">
                        Loaded: {fileName}
                    </p>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".txt,.md,.pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </>
    );
}