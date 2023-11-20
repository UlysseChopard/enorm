#! /usr/bin/env bash

cd api/models

for file in $(ls); do
  if [[ $file == "index.js" || $file != *.js ]]; then
    continue
  fi
  name=$(git grep -wh "${file::-3}\"" -- "index.js" | sed -e 's/exports\.//' -e 's/\ =.*$//')
  if [[ -z $name ]]; then
    continue
  fi
  for cmd in $(git grep -h exports -- $file | sed -e "s/exports/$name/g" -e 's/\ =.*//g'); do
    count=$(git grep -ow $cmd -- .. | wc -l)
    if [[ $count -eq 0 ]]; then
      echo $cmd
    fi
  done
done
