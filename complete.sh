#!/usr/bin/env bash
set -e

git remote rename origin skeleton
npm i lodash.merge
./merge-json.js package.json PROJECT-package.json > package.json
npm rm lodash.merge
rm merge-json.js PROJECT-package.json complete.sh
git add --all .
git commit -n -m 'pollinate project'"

