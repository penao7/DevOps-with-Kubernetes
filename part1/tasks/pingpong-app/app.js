const express = require('express')
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');

const directory = path.join('/', 'usr', 'app');
const filePath = path.join(directory, 'pingpong.txt');

let pong = 0;

const output = () => {
  return `${pong}`;
};

const incrementOnGet = async () => {
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
