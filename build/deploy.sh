#!/bin/bash

# abort on errors
set -e

echo "Deploying ..."

# build
npm run build

# navigate into the build output directory
cd dist

git init --initial-branch=master
git add -A
git commit -m "deploy"

git push -f git@github.com:mengxiong10/hlx.git master:gh-pages

cd -
