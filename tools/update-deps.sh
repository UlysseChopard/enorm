#! /usr/bin/env bash

function commit_package_files() {
  git add package*.json
  if [ $(git diff --name-only --staged | wc -l) -ge 1 ]; then
    git commit -m "$1"
  fi
}

function update_version() {
  npm outdated -p -w "$1" | awk '{ print $(NF - 1) }' | sed 's/@[^@]*$/@latest/g' | npm install -w "$1"
  commit_package_files "chore upgrade ${1} deps"
}

source $HOME/.nvm/nvm.sh
if [ $(nvm version-remote --lts) != $(npm pkg get engines.node) ]; then
  nvm install --reinstall-packages-from=current --latest-npm --lts
  npm pkg set engines.node=$(nvm current) engines.npm=$(echo v$(npm --version))
  git add package.json
  git commit -m "chore: update node and npm"
else
  latest_npm=$(nvm install-latest-npm | tail -1 | awk '{ print $NF }')
  if [ ${latest_npm} != $(npm pkg get engines.npm) ]; then
    npm pkg set engines.npm=$latest_npm
    git add package.json
    git commit -m "chore: update npm"
  fi
fi
npm update
commit_package_files 'chore: update deps'
update_version api
update_version app
