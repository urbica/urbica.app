// @flow

import Router from 'koa-router';
import teams from './team/team.controller';
import users from './user/user.controller';

const router = new Router();

teams.use('/:teamId/users', users.routes(), users.allowedMethods());

router.use('/teams', teams.routes(), teams.allowedMethods());

export default router;
