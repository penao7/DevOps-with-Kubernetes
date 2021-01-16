const mongoose = require('mongoose');

const user = process.env.TODO_USER_USERNAME
const password = process.env.TODO_USER_PASSWORD

const url = `mongodb://${user}:${password}@mongodb-0.mongo-svc/todo-app?retryWrites=true`;

console.log('initializing connection to MongoDB...');
mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB!');
  })
  .catch(err => {
    console.log('connectiong failed', err.message);
  });
