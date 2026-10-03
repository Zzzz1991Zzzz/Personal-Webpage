#!/usr/bin/env bash
# Compile the CV and copy the PDF to the site root.
set -euo pipefail
cd "$(dirname "$0")"
pdflatex -interaction=nonstopmode -halt-on-error Yang_Zhang_CV.tex >/dev/null
pdflatex -interaction=nonstopmode -halt-on-error Yang_Zhang_CV.tex >/dev/null
cp Yang_Zhang_CV.pdf ../Yang_Zhang_CV.pdf
rm -f Yang_Zhang_CV.aux Yang_Zhang_CV.log Yang_Zhang_CV.out
echo "Built ../Yang_Zhang_CV.pdf"
