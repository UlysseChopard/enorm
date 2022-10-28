#!/bin/bash

echo $1
curl http://localhost:3000/api/activate/"$1" -b cookies -c cookies
