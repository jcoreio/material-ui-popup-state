#!/usr/bin/env bash
set -e

git remote rename origin skeleton
git branch -D master
git checkout -b master
rm complete.sh
git add --all .
git commit -n -m 'pollinate project'

