#!/bin/bash

echo Reset password
echo Need current uuid
curl http://localhost:3000/api/accounts/password/reset -X PUT -d "password=Reset&uuid=$1"
