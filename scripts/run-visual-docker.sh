#!/usr/bin/env bash
set -euo pipefail

readonly image="mcr.microsoft.com/playwright:v1.59.1-noble"
readonly command="${1:-test:visual}"

docker run --rm \
  --ipc=host \
  -v "$PWD:/work" \
  -v moonshine-node-modules:/work/node_modules \
  -v moonshine-pnpm-store:/pnpm/store \
  -w /work \
  "$image" \
  bash -lc "
    corepack enable &&
    corepack prepare pnpm@9.0.0 --activate &&
    pnpm config set store-dir /pnpm/store &&
    pnpm install --frozen-lockfile &&
    CI=true pnpm ${command}
  "
