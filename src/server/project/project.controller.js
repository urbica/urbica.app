// @flow

import Router from 'koa-router';
import Project from './project.model';

const router = new Router();

router.get('/', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const projects = await Project.getAll(teamId);
  ctx.body = projects;
});

router.get('/:projectId(\\d+)', async (ctx) => {
  const projectId = parseInt(ctx.params.projectId, 10);
  const project = await Project.get(projectId);

  ctx.assert(project, 404, `Couldn't find Project with 'id'=${projectId}`);
  ctx.body = project;
});

router.post('/', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const attributes = ctx.request.body;
  // ensure that we are creating Project in the corresponding Team
  attributes.team_id = teamId;
  const project = await Project.create(attributes);

  ctx.status = 201;
  ctx.body = project;
});

router.put('/:projectId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const projectId = parseInt(ctx.params.projectId, 10);
  const attributes = ctx.request.body;

  // ensure that we are updating Project in the corresponding Team
  ctx.assert(
    attributes.team_id === teamId,
    406,
    `Project 'team_id'=${attributes.team_id} does not match with corresponding Team 'id'=${teamId}`
  );

  const project = await Project.update(projectId, attributes);
  ctx.body = project;
});

router.delete('/:projectId(\\d+)', async (ctx) => {
  const teamId = parseInt(ctx.params.teamId, 10);
  const projectId = parseInt(ctx.params.projectId, 10);
  const project = await Project.get(projectId);

  // ensure that we are deleting Project in the corresponding Team
  ctx.assert(
    project.team_id === teamId,
    406,
    `Project 'team_id'=${project.team_id} does not match with corresponding Team 'id'=${teamId}`
  );

  await Project.delete(projectId);
  ctx.status = 204;
  ctx.body = undefined;
});

export default router;
