const uuid = require("uuid");

const randomString = uuid.v4();
const date = new Date().toISOString();

const output = () => {
  console.log(`${date}: ${randomString}`);
}

output();


setInterval(() => {
  output();
}, 5000);


