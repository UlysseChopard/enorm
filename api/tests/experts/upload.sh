#!/bin/bash

echo Upload a csv file of experts
curl http://localhost:3000/api/experts/upload -b ../accounts/cookies -F "file=@./Experts.txt" -v
