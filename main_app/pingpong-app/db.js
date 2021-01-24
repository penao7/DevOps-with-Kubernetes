const { Client } = require('pg');
const fs = require('fs').promises

const password = process.env.POSTGRES_PASSWORD; 

const client = new Client({
  user: 'postgres',
  host: 'db-0.postgres-svc',
  database: 'pingpong',
  password: password,
  port: 5432,
});

client.connect();

const initialDBContent = async () => {
   try {
    await client.query('DROP TABLE IF EXISTS pings CASCADE');
    await client.query('CREATE TABLE pings(pongs INTEGER NOT NULL);');
    await client.query('INSERT INTO pings(pongs) VALUES (0);');
  } catch (err) {
    console.log(err)
  }
};

const output = async () => {
  try {
    const res = await client.query('SELECT pongs FROM pings;');
    return res.rows[0];
  } catch (err) {
    console.log(err)
  }
};

const incrementOnGet = async () => {
  try {
    await client.query('UPDATE pings SET pongs = pongs + 1;');
  } catch (err) {
    console.log(err)
  }
};

exports.initDB = initialDBContent;
exports.output = output;
exports.incrementOnGet = incrementOnGet;
