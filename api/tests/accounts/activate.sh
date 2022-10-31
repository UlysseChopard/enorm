#!/bin/bash

echo "Activate account $1"
curl http://localhost:3000/api/accounts/"$1"/activate -b cookies -c cookies
