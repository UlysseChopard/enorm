#!/bin/bash

echo 'Delete account'
curl http://localhost:3000/api/accounts -X DELETE -b cookies
