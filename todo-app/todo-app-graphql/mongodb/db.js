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
  .then(res => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Connection failed', err.message));

const testConnection = async () => {
try {
  await mongoose.connect(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
} catch (err) {
  throw err
}
};

exports.test = testConnection;
