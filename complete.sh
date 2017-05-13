#!/usr/bin/env bash
set -e

git remote rename origin skeleton
rm complete.sh
git add --all .
git commit -n -m 'pollinate project'

