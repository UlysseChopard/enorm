#!/bin/bash

echo Login
curl "http://localhost:3000/api/accounts/login" -d 'email=chopard.ulysse@gmail.com&password=test' -c cookies
