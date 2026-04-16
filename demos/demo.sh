#!/bin/bash
# A sample script that demonstrates the VHS-style "run" command feature.
# Run this by typing: slides-tape run demo.sh

# @echo off
set -euo pipefail

GREEN='\033[0;32m'
NC='\033[0m' # No Color

# @wait 1s
# @title "System Check"
# @type "echo 'Testing environment for slides-tape payload...'"
echo -e "\nEnvironment healthy. Proceeding with deployment checks."

# @wait 1.5s
# @clear
# @title "Running tests"
# @type "npm run test"
echo "> slides-tape@1.0.0 test"
echo "> vitest run"
echo ""
sleep 1
echo " ✓ src/parser.test.js (42ms)"
echo " ✓ src/server.test.js (15ms)"
echo " ✓ src/runner.test.js (79ms)"
echo ""
# @wait 1s
echo -e "${GREEN}All tests passed (3/3)${NC}"

# @wait 3s
