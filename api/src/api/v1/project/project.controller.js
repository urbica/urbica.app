const Router = require('koa-router');
const { Project } = require('./project.model');

const router = new Router();

router.get('/', async (ctx) => {
  const { teamId } = ctx.params;
  const projects = await Project.find({ team: teamId });
  ctx.body = projects;
});

router.get('/:projectId', async (ctx) => {
  const { projectId } = ctx.params;

  const project = await Project.findById(projectId)
    .populate('team')
    .lean();

  ctx.assert(project, 404, `Couldn't find Project with 'id'=${projectId}`);
  ctx.body = project;
});

router.post('/', async (ctx) => {
  const params = ctx.request.body;
  const project = new Project(params);
  const newProject = await project.save();

  ctx.status = 201;
  ctx.body = newProject;
});

// router.put('/:projectId', async (req, res) => {
//   const { projectId } = req.params;
//   const params = req.body;
//   const newProject = await Project.findByIdAndUpdate(projectId, params, { new: true });
//   res.status(200).send(newProject.toJSON());
// });

// router.delete('/:projectId', async (req, res) => {
//   const { projectId } = req.params;
//   await Project.findByIdAndRemove(projectId, {});
//   res.status(204).send(undefined);
// });

module.exports = router;
