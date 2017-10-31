const users = require('./user/user.controller');

module.exports = (app) => {
  app.use('/users', users);
};
