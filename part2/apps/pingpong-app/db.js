const { Client } = require('pg');
const password = process.env.POSTGRES_PASSWORD;

const client = new Client({
  user: 'postgres',
  host: 'db-0.postgres-svc',
  database: 'pingpong',
  password: password,
  port: 5432,
})

const initialDBContent = async () => {
   try {
    await client.query('DROP TABLE IF EXISTS pings CASCADE');
    await client.query('CREATE TABLE pings(pongs INTEGER NOT NULL);');
    await client.query('INSERT INTO pings(pongs) VALUES (0);');
  } catch (err) {
    console.log(err)
  }
};

exports.client = client;
exports.initialDBContent = initialDBContent;
