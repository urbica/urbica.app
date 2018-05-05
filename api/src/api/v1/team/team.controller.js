const Router = require('koa-router');
const { Team } = require('./team.model');

const router = new Router();

router.get('/', async (ctx) => {
  const teams = await Team.find();
  ctx.body = teams;
});

router.get('/:teamId', async (ctx) => {
  const { teamId } = ctx.params;
  const team = await Team.findById(teamId);
  ctx.assert(team, 404, `Couldn't find Team with 'id'=${teamId}`);
  ctx.body = team;
});

router.get('/:teamId/database', async (ctx) => {
  const { teamId } = ctx.params;
  const team = await Team.findById(teamId);
  ctx.assert(team, 404, `Couldn't find Team with 'id'=${teamId}`);

  const databaseContainer = team.getDatabaseContainer();
  if (databaseContainer) {
    ctx.body = await databaseContainer.inspect();
  }
});

router.post('/', async (ctx) => {
  const params = ctx.request.body;
  const team = new Team(params);
  const newTeam = await team.save();

  ctx.status = 201;
  ctx.body = newTeam;
});

router.delete('/:teamId', async (ctx) => {
  const { teamId } = ctx.params;
  const team = await Team.findById(teamId);
  ctx.assert(team, 404, `Couldn't find Team with 'id'=${teamId}`);
  await team.remove();

  ctx.status = 204;
  ctx.body = undefined;
});

module.exports = router;
