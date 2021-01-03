const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const uuid = require("uuid");
const path = require("path");
const fs = require('fs').promises;
const axios = require('axios');

const directory = path.join('/', 'usr', 'app');
const datePath = path.join(directory, 'date.txt'); 
const pingPongPath = path.join(directory, 'pingpong.txt');

const generateHash = () => {
  return uuid.v4();
};

let currentHash = generateHash();
let currentDate = '';

const getPongs = async () => {
  try {
    const response = await axios.get('http://pingpong');
    return response.data.pings;
  } catch (err) {
    console.log(err);
  }
};

const getDate = async () => {
  try {
    const data = await fs.readFile(datePath, 'utf-8');
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

  const pongs = await getPongs();

  if(await checkIfDateChanged()) {
    currentHash = generateHash();
  };

  return `${currentDate}: ${currentHash}\npings / pongs: ${pongs}`

};

app.get('/', async (req,res) => {
  res.end(await output());
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});


