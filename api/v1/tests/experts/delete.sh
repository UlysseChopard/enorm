#!/bin/bash

echo Delete the expert associated with the email and whose manager is responsible for the request
curl http://localhost:3000/api/experts -X DELETE -b ../accounts/cookies -d 'email=ulysse.chopard@laposte.net'
