mongo <<EOF
use todo-app
db.createUser({
  user: '$TODO_USER_USERNAME',
  pwd:  '$TODO_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'todo-app'
  }]
})
EOF
