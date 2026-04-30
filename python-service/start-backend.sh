#!/usr/bin/env bash
# Starts all exercise Flask servers used by the Next.js app:
#   backend2.py  -> port 5001 (Press)
#   backend3.py  -> port 5002 (Squat)
#   backend.py   -> port 5003 (Bicep Curl)
set -euo pipefail
cd "$(dirname "$0")"

PYTHON="${PYTHON:-python3}"

cleanup() {
  local pid
  for pid in $(jobs -p 2>/dev/null); do
    kill "$pid" 2>/dev/null || true
  done
}
trap 'cleanup; exit 0' INT TERM

echo "Starting Python backends on 5001 (Press), 5002 (Squat), 5003 (Bicep Curl)..."
echo "Use Ctrl+C to stop all."

"$PYTHON" backend2.py &
"$PYTHON" backend3.py &
"$PYTHON" backend.py &
wait
