#!/bin/bash

PROJECT="$(basename $(pwd))"
SKELETON="$(node -e 'console.log(require("./package.json").name)')"

git remote rename origin skeleton

echo "# $PROJECT" > README.md

sed -i '' "s/$SKELETON/$PROJECT/g" *.js package.json .flowconfig webpack/*.js
find app -type f -exec sed -i '' "s/$SKELETON/$PROJECT/g" {} +

git add .
git commit -m "rename project to $PROJECT"
