const teams = require('./team/team.controller');
const users = require('./user/user.controller');

module.exports = (app) => {
  app.use('/teams', teams);
  app.use('/teams', users);
};
