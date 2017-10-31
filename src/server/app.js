// @flow

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mountRoutes from './routes';

const app = express();

// disable X-Powered-By
app.disable('x-powered-by');

// create morgan middleware
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// mount app routes
mountRoutes(app);

module.exports = app;
