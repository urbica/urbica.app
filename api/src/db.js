const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const conectionString = process.env.MONGODB_URL;
mongoose.connect(conectionString);
const db = mongoose.connection;

db.on('error', (error) => {
  process.stderr.write(`connection error (${conectionString}): ${error}\n`);
  process.exit(-1);
});

module.exports = db;
