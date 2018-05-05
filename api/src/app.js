/* eslint-disable camelcase */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const api_v1 = require('./api/v1');
require('./db');

const app = new Koa();

app.use(bodyParser());
app.use(api_v1);

module.exports = app;
