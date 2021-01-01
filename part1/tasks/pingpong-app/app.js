const express = require('express')
const app = express();
const port = process.env.PORT || 4000;

let pong = 0;


const incrementOnGet = () => {
  pong++;
  return pong;
};


app.get('/', (req, res) => {
  res.end(`pong ${incrementOnGet()}`);
});

app.listen(port, () => {
  console.log(`server running at port ${port}`)
});
