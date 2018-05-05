const mount = require('koa-mount');
const Router = require('koa-router');
const teams = require('./team/team.controller');
const projects = require('./project/project.controller');

const router = new Router();

router.use('/teams', teams.routes(), teams.allowedMethods());
router.use('/projects', projects.routes(), projects.allowedMethods());

module.exports = mount('/api/v1', router.routes());
