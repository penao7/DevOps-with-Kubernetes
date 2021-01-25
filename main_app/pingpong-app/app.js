const express = require('express')
const app = express();
const port = process.env.APP_PORT || 4000;
const db = require('./db');

app.get('/', async (req, res) => {
  await db.incrementOnGet();
  res.json(await db.output());
});

app.listen(port, async () => {
  console.log(`server running at port ${port}`)
});
