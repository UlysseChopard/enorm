#!/bin/bash

echo Signup
curl http://localhost:3000/api/accounts/signup -d 'firstname=Ulysse&lastname=Chopard-Guillaumot&email=chopard.ulysse@gmail.com&password=test&civility=m&phonenumber=+33670417865' -c cookies
