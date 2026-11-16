#!/usr/bin/env bash
# Compile a CV source into a PDF next to it (cv/*.pdf is gitignored; the
# CV is not published on the site). Usage: ./cv/build.sh [Yang_Zhang_CV_v2]
# Uses pdflatex when available, otherwise tectonic (brew install tectonic).
set -euo pipefail
cd "$(dirname "$0")"
name="${1:-Yang_Zhang_CV}"
if command -v pdflatex >/dev/null 2>&1; then
  pdflatex -interaction=nonstopmode -halt-on-error "$name.tex" >/dev/null
  pdflatex -interaction=nonstopmode -halt-on-error "$name.tex" >/dev/null
elif command -v tectonic >/dev/null 2>&1; then
  # Tectonic ships its own packages; build from a scratch dir so the
  # vendored .sty files (for minimal pdflatex installs) do not shadow them.
  tmp="$(mktemp -d)"
  cp "$name.tex" "$tmp/"
  tectonic -o "$tmp" "$tmp/$name.tex"
  cp "$tmp/$name.pdf" "$name.pdf"
  rm -rf "$tmp"
else
  echo "Need pdflatex or tectonic to build the CV." >&2
  exit 1
fi
rm -f "$name.aux" "$name.log" "$name.out"
echo "Built cv/$name.pdf"
