#!/usr/bin/env bash
set -euo pipefail

if [ "${1:-}" = "--" ]; then
  shift
fi

readonly command=(pnpm exec playwright test -c playwright.visual.config.ts "$@")

if [ "${CI:-}" = "true" ]; then
  CI=true "${command[@]}"
else
  # For local development, run in Docker
  scripts/run-visual-docker.sh "${command[@]}"
fi
