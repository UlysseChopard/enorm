#!/bin/bash

curl "http://localhost:3000/api/login" -d 'email=chopard.ulysse@gmail.com&password=test' -c cookies
