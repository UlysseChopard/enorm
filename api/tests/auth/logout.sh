#!/bin/bash

echo Logout
curl -X POST "http://localhost:3000/api/accounts/logout" -b cookies
