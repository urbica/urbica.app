// @flow

const Router = require('express-promise-router');
const User = require('./user.model');

const router = new Router();

router.get('/:teamId(\\d+)/users', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const users = await User.getAll(teamId);
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:teamId(\\d+)/users/:userId(\\d+)', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await User.get(userId);
    if (!user) {
      res.status(404).send({ message: `Couldn't find User with 'id'=${userId}` });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/:teamId(\\d+)/users', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const attributes = req.body;
    // ensure that we are creating User in the corresponding Team
    attributes.team_id = teamId;
    const user = await User.create(attributes);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:teamId(\\d+)/users/:userId(\\d+)', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = parseInt(req.params.userId, 10);
    const attributes = req.body;
    // ensure that we are updating User in the corresponding Team
    if (attributes.team_id === teamId) {
      const user = await User.update(userId, attributes);
      res.send(user);
    } else {
      res.status(406).send({
        message: `User 'team_id'=${attributes.team_id} does not match with corresponding Team 'id'=${teamId}`
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:teamId(\\d+)/users/:userId(\\d+)', async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId, 10);
    const userId = parseInt(req.params.userId, 10);
    const user = await User.get(userId);
    // ensure that we are deleting User in the corresponding Team
    if (user.team_id === teamId) {
      await User.delete(userId);
      res.status(204).end();
    } else {
      res.status(406).send({
        message: `User 'team_id'=${user.team_id} does not match with corresponding Team 'id'=${teamId}`
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
