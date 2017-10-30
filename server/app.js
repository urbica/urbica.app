const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mountRoutes = require('./routes');

const app = express();

// create morgan middleware
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// mount app routes
mountRoutes(app);

app.listen(3000);
