#!/usr/bin/env bash
# Emits the CV Builder menu as a SessionStart hook systemMessage, shown to the
# user when they open Claude Code at the repo root.

# No jq → skip the banner rather than break the session start.
command -v jq >/dev/null 2>&1 || exit 0

read -r -d '' MENU <<'EOF'
CV Builder — evaluate your resume locally and privately. Nothing leaves your machine.

  /evaluate-cv <resume.pdf|.md|.txt> [--jd <job.md>]   Score a resume against the rubric
  /setup-profile                                       Assemble a resume if you don't have a file yet

No build or install needed to evaluate.

What would you like to do?
EOF

jq -n --arg msg "$MENU" '{systemMessage: $msg}'
