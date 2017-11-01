// @flow

import Router from 'koa-router';
import Team from './team.model';

const router = new Router();

router.get('/', async (ctx) => {
  const teams = await Team.getAll();
  ctx.body = teams;
});

router.get('/:teamId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const team = await Team.get(teamId);

  ctx.assert(team, 404, `Couldn't find Team with 'id'=${teamId}`);
  ctx.body = team;
});

router.post('/', async (ctx) => {
  const attributes = ctx.request.body;
  const team = await Team.create(attributes);

  ctx.status = 201;
  ctx.body = team;
});

router.put('/:teamId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const attributes = ctx.request.body;

  const team = await Team.update(teamId, attributes);
  ctx.body = team;
});

router.delete('/:teamId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  await Team.delete(teamId);

  ctx.status = 204;
  ctx.body = undefined;
});

export default router;
