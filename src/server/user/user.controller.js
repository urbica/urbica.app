// @flow

import Router from 'koa-router';
import User from './user.model';

const router = new Router();

router.get('/', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const users = await User.getAll(teamId);
  ctx.body = users;
});

router.get('/:userId(\\d+)', async (ctx) => {
  const userId = parseInt(ctx.params.userId, 10);
  const user = await User.get(userId);

  ctx.assert(user, 404, `Couldn't find User with 'id'=${userId}`);
  ctx.body = user;
});

router.post('/', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const attributes = ctx.request.body;
  // ensure that we are creating User in the corresponding Team
  attributes.team_id = teamId;
  const user = await User.create(attributes);

  ctx.status = 201;
  ctx.body = user;
});

router.put('/:userId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const userId = parseInt(ctx.params.userId, 10);
  const attributes = ctx.request.body;

  // ensure that we are updating User in the corresponding Team
  ctx.assert(
    attributes.team_id === teamId,
    406,
    `User 'team_id'=${attributes.team_id} does not match with corresponding Team 'id'=${teamId}`
  );

  const user = await User.update(userId, attributes);
  ctx.body = user;
});

router.delete('/:userId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const userId = parseInt(ctx.params.userId, 10);
  const user = await User.get(userId);

  // ensure that we are deleting User in the corresponding Team
  ctx.assert(
    user.team_id === teamId,
    406,
    `User 'team_id'=${user.team_id} does not match with corresponding Team 'id'=${teamId}`
  );

  await User.delete(userId);
  ctx.status = 204;
  ctx.body = undefined;
});

export default router;
