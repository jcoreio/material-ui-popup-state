#!/usr/bin/env bash
set -e

if [[ $(git symbolic-ref --short HEAD) != 'master' ]]; then
  git branch -D master
  git checkout -b master
fi
git branch --unset-upstream master
git remote rename origin skeleton
git remote add origin $(node -p 'require("./package").repository.url')
rm complete.sh
git add --all .
git commit -n -m 'pollinate project'

