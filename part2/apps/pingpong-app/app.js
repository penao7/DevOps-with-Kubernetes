const express = require('express')
const fs = require('fs').promises;
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const { Client } = require('pg');
const db = require('./db');

db.client.connect();
db.initialDBContent();

const output = async () => {
  try {
    const res = await db.client.query('SELECT pongs FROM pings;');
    return res.rows[0];
  } catch (err) {
    console.log(err)
  }
};

const incrementOnGet = async () => {
  try {
    await db.client.query('UPDATE pings SET pongs = pongs + 1;');
  } catch (err) {
    console.log(err)
  }
};

app.get('/', async (req, res) => {
  incrementOnGet();
  res.json(await output());
});

app.listen(port, async () => {
  console.log(`server running at port ${port}`)
});
