const { Client } = require('pg');
const fs = require('fs');

const password = fs.readFileSync('/etc/secrets/POSTGRES_PASSWORD', 'utf-8');

const client = new Client({
  user: 'postgres',
  host: 'db-0.postgres-svc.pingpongdatehash.svc.cluster.local',
  database: 'pingpong',
  password: password,
  port: 5432,
});

const initialDBContent = async () => {
   try {
    await client.query('DROP TABLE IF EXISTS pings CASCADE');
    await client.query('CREATE TABLE pings(pongs INTEGER NOT NULL);');
    await client.query('INSERT INTO pings(pongs) VALUES (0);');
    console.log('DB initiated');
  } catch (err) {
    console.log(err)
  }
};

client.connect();
initialDBContent();

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
