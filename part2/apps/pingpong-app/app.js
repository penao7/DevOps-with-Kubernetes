const express = require('express')
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');

const directory = path.join('/', 'usr', 'app');
const filePath = path.join(directory, 'pingpong.txt');

let pong = '';

const output = () => {
  
  const output = {
    pings: pong 
  };

  return output;
};

const incrementOnGet = async () => {
  pong++;
};

app.get('/', async (req, res) => {
  incrementOnGet();
  res.json(output());
});

app.listen(port, () => {
  console.log(`server running at port ${port}`)
});
