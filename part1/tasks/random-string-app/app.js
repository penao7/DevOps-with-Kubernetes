const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const uuid = require("uuid");


const getRandomString = () => {
  return uuid.v4();
};

const getDate = () => {
 return new Date().toISOString();
};

const output = () => {
  return `${getDate()}: ${getRandomString()}`;
};

app.get('/', (req,res) => {
  res.send(output());
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});


