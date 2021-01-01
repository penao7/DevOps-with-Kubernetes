const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const uuid = require("uuid");
const path = require("path");
const fs = require('fs').promises;

const directory = path.join('/', 'usr', 'app');
const filePath = path.join(directory, 'date.txt'); 

console.log(filePath);

const generateHash = () => {
  return uuid.v4();
};

let currentHash = generateHash();
let currentDate = '';

const getDate = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (err) {
    console.log(err);
  };
};

const checkIfDateChanged = async () => {

  const date = await getDate();

  if(currentDate !== date) {
    currentDate = date;
    return true;
  };

  return false;
};

const output = async () => {

  if(await checkIfDateChanged()) {
    currentHash = generateHash();
  };

  return {
    date: currentDate,
    hash: currentHash
  }

};

app.get('/', async (req,res) => {
  res.json(await output());
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});


