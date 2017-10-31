// @flow

const { Pool } = require('pg');
const bluebird = require('bluebird');

type Row = {
  [key: string]: any
};

type ResultSet = {
  rows: Array<Row>
};

type PoolClient = {
  query: (text: string, values: ?Array<any>) => Promise<ResultSet>
};

const db: PoolClient = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data',
  password: 'postgres',
  poolSize: 20,
  Promise: bluebird
});

module.exports = db;
