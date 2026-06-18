export const EVALUATION_RESULT_KEY =
  "evaluation-result";

export function saveEvaluationResult(
  data: unknown
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      EVALUATION_RESULT_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Failed to save evaluation result:", error);
    // Optionally notify the user
  }
}

export function getEvaluationResult() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(
    EVALUATION_RESULT_KEY
  );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse evaluation result:", error);
    return null;
  }
}