#!/usr/bin/env bash
set -e

cd {{ name }}
git remote rename origin skeleton
./merge-json.js package.json PROJECT-package.json > package.json
rm merge-json.js PROJECT-package.json complete.sh
git add --all .
git commit -n -m 'pollinate project'"

