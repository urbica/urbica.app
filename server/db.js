const { Pool } = require('pg');
const bluebird = require('bluebird');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data',
  password: 'postgres',
  poolSize: 20,
  Promise: bluebird
});

module.exports = db;
