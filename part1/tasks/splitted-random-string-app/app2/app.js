const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const uuid = require("uuid");
const path = require("path");
const fs = require('fs').promises;

const directory = path.join('/', 'usr', 'app');
const datePath = path.join(directory, 'date.txt'); 
const pingPongPath = path.join(directory, 'pingpong.txt');

const generateHash = () => {
  return uuid.v4();
};

let currentHash = generateHash();
let currentDate = '';

const getDate = async () => {
  try {
    const data = await fs.readFile(datePath, 'utf-8');
    return data;
  } catch (err) {
    console.log(err);
  };
};

const getPingPong = async () => {
  try {
    const pingpong = await fs.readFile(pingPongPath, 'utf-8');
    return pingpong;
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

  const pingpong = await getPingPong();

  if(await checkIfDateChanged()) {
    currentHash = generateHash();
  };

  return `${currentDate}: ${currentHash}\npings / pongs: ${pingpong ? pingpong : '0'}`

};

app.get('/', async (req,res) => {
  res.end(await output());
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});


