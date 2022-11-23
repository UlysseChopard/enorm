#!/bin/bash

echo Declare a single expert by his email adress
echo If ulysse.chopard@laposte.net does not exist in the users emails, it should send an invitation to him
curl http://localhost:3000/api/experts -b ../accounts/cookies -d 'email=ulysse.chopard@laposte.net'
