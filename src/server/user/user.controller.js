// @flow

const Router = require('express-promise-router');
const User = require('./user.model');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
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

router.post('/', async (req, res) => {
  try {
    const attributes = req.body;
    const user = await User.create(attributes);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const attributes = req.body;
    const user = await User.update(userId, attributes);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await User.delete(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
