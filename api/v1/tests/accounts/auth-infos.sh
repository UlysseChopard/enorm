#!/bin/bash

echo Get auth status
curl http://localhost:3000/api/accounts -b cookies -c cookies
