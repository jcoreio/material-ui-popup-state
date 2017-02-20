#!/usr/bin/env bash
set -e

git remote rename origin skeleton
npm i lodash.merge
./merge-package-json.js
npm rm lodash.merge
rm merge-package-json.js PROJECT-package.json complete.sh
git add --all .
git commit -n -m 'pollinate project'

