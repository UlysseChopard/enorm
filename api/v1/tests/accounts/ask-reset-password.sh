#!/bin/bash

echo Ask for a link to reset password
curl http://localhost:3000/api/accounts/password/reset -X POST -d 'email=chopard.ulysse@gmail.com'
