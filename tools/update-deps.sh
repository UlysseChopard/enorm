#! /usr/bin/env bash

source $HOME/.nvm/nvm.sh
if [ $(nvm version-remote --lts) != $(nvm current) ]; then
  nvm install --reinstall-packages-from=current --latest-npm --lts
  npm pkg set engines.node=$(nvm current) engines.npm=$(echo v$(npm --version))
  git add package.json
  git commit -m "chore: update node and npm"
else
  latest_npm=$(nvm install-latest-npm | tail -1 | awk '{ print $NF }')
  if [ $latest_npm != $(jq '.engines.npm' package.json) ]; then
    npm pkg set engines.npm=$latest_npm
    git add package.json
    git commit -m "chore: update npm"
  fi
fi
npm update
if [ $(git diff --name-only | wc -l) -ne 0 ]; then
  git add package*.json
  git commit -m "chore: update deps"
fi
npm outdated
