#!/usr/bin/env bash
# Crops Instagram screenshots (1179x2556) down to just the design content,
# stripping out the top status bar / profile pill and bottom heart/comment row.
# IMG_0796 (pricing reference) and IMG_0800 (brand summary) intentionally excluded.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/web/public/images/designs"
mkdir -p "$OUT"

# Bash 3.2 (stock macOS) lacks associative arrays, so use a parallel-array pattern.
SRCS=(
  IMG_0797.PNG
  IMG_0798.PNG
  IMG_0799.PNG
  IMG_0801.PNG
  IMG_0802.PNG
  IMG_0803.PNG
  IMG_0804.PNG
  IMG_0805.PNG
  IMG_0806.PNG
  IMG_0807.PNG
  IMG_0808.PNG
)
DSTS=(
  spurs-palm.png
  shes-from-texas.png
  crazy-hispanic-fan.png
  icon-set.png
  wemby-alien.png
  nombre-shut-up.png
  elbows-up.png
  the-coyote.png
  spurs-snoopy.png
  wembanyama-2023.png
  spurs-boots.png
)

# Crop region (calibrated against 1179x2556 iPhone Instagram screenshots).
# `sips --cropOffset Y X -c H W` keeps an HxW window; positive Y shifts the
# window toward the TOP of the source. OFFSET_Y=500 + CROP_H=1150 keeps roughly
# source y=200..1350, which is the IG image content (post-author row trimmed,
# heart/comment row trimmed).
OFFSET_Y=500
CROP_H=1150
CROP_W=1179

count=${#SRCS[@]}
for ((i=0; i<count; i++)); do
  src="${SRCS[$i]}"
  dst="${DSTS[$i]}"
  if [[ ! -f "$ROOT/$src" ]]; then
    echo "skip: $src not found" >&2
    continue
  fi
  cp "$ROOT/$src" "$OUT/$dst"
  sips --cropOffset "$OFFSET_Y" 0 -c "$CROP_H" "$CROP_W" "$OUT/$dst" >/dev/null
  echo "wrote $OUT/$dst"
done
