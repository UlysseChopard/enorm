#!/bin/bash

echo Update email, firstname and or lastname
curl -X PATCH http://localhost:3000/api/accounts -d 'email=31dionysos@gmail.com&firstname=31&lastname=Dionysos' -b cookies -c cookies
