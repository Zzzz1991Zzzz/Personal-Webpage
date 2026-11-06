#!/usr/bin/env bash
# Compile the CV and copy the PDF to the site root.
# Uses pdflatex when available, otherwise tectonic (brew install tectonic).
set -euo pipefail
cd "$(dirname "$0")"
if command -v pdflatex >/dev/null 2>&1; then
  pdflatex -interaction=nonstopmode -halt-on-error Yang_Zhang_CV.tex >/dev/null
  pdflatex -interaction=nonstopmode -halt-on-error Yang_Zhang_CV.tex >/dev/null
elif command -v tectonic >/dev/null 2>&1; then
  # Tectonic ships its own packages; build from a scratch dir so the
  # vendored .sty files (for minimal pdflatex installs) do not shadow them.
  tmp="$(mktemp -d)"
  cp Yang_Zhang_CV.tex "$tmp/"
  tectonic -o "$tmp" "$tmp/Yang_Zhang_CV.tex"
  cp "$tmp/Yang_Zhang_CV.pdf" Yang_Zhang_CV.pdf
  rm -rf "$tmp"
else
  echo "Need pdflatex or tectonic to build the CV." >&2
  exit 1
fi
cp Yang_Zhang_CV.pdf ../Yang_Zhang_CV.pdf
rm -f Yang_Zhang_CV.aux Yang_Zhang_CV.log Yang_Zhang_CV.out
echo "Built ../Yang_Zhang_CV.pdf"
