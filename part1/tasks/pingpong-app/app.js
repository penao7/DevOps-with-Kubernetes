const express = require('express')
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');

const directory = path.join('/', 'usr', 'app');
const filePath = path.join(directory, 'pingpong.txt');

let pong = '';

const output = () => {
  return `${pong}`;
};

const getPingPong = async () => {
  try {
    const pingpong = fs.readFile(filePath, 'utf-8');
    console.log('pingpongs fetched from pongpong.txt');
    return pingpong;
  } catch (err) {
    console.log(err);
  }
};

const incrementOnGet = async () => {
  if (pong === '') {
    pong = await getPingPong();
  };

  pong++;

  try {
    await fs.writeFile(filePath, output());
    return pong;
  } catch (err) {
    console.log(err)
  }
};

app.get('/', async (req, res) => {
  res.end(`pong ${await incrementOnGet()}`);
});

app.listen(port, () => {
  console.log(`server running at port ${port}`)
});
