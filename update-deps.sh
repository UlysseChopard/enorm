#! /usr/bin/env bash

npm update
if [ $(git diff --name-only | wc -l) -ne 0 ]; then
  git add package*.json
  git commit -m "chore: update deps"
fi
npm outdated
