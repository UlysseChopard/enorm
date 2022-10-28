#!/bin/bash

curl "http://localhost:3000/api/confirm/$1" -b cookies -c cookies
