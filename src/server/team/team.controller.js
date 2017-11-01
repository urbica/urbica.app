// @flow

const Router = require('express-promise-router');
const Team = require('./team.model');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.getAll();
    res.send(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:teamId(\\d+)', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const team = await Team.get(teamId);
    if (!team) {
      res.status(404).send({ message: `Couldn't find Team with 'id'=${teamId}` });
    } else {
      res.send(team);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const attributes = req.body;
    const team = await Team.create(attributes);
    res.status(201).send(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:teamId(\\d+)', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const attributes = req.body;
    const team = await Team.update(teamId, attributes);
    res.send(team);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:teamId(\\d+)', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    await Team.delete(teamId);
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
