#!/bin/bash

echo Get user infos
curl http://localhost:3000/api/accounts -b cookies
