#!/usr/bin/env bash
set -euo pipefail

# Builds vscode into lib/vscode/out-vscode.

# MINIFY controls whether a minified version of vscode is built.
MINIFY=${MINIFY-true}

main() {
  cd "$(dirname "${0}")/../.."
  cd lib/vscode

  yarn gulp compile-build compile-extensions-build compile-extension-media
  yarn gulp optimize --gulpfile ./coder.js
  if [[ $MINIFY ]]; then
    yarn gulp minify --gulpfile ./coder.js
  fi
}

main "$@"
