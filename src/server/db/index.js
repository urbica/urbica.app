// @flow

const { Pool } = require('pg');
const bluebird = require('bluebird');

type Row = {
  [key: string]: any
};

type ResultSet = {
  rows: Row[]
};

type PoolClient = {
  query: (text: string, values: ?Array<any>) => Promise<ResultSet>,
  end: () => Promise<void>
};

const db: PoolClient = new Pool({
  poolSize: 20,
  Promise: bluebird
});

module.exports = db;
