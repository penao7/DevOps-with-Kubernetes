#!/bin/bash
set -e

mongo <<EOF
use todo-app
db.createUser({
  user: '$TODO_USERNAME',
  pwd:  '$TODO_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'todo-app'
  }]
})
EOF
