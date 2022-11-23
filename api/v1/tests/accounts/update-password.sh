#!/bin/bash

echo Update password
curl -X PUT http://localhost:3000/api/accounts/password -d 'oldpass=test&newpass=Test' -c cookies -b cookies -v
