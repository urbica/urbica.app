// @flow

const db = require('../db');
const User = require('./user');

afterAll(() => db.end());

describe('User', () => {
  describe('#getAll', () => {
    test('returns array', async () => {
      expect.assertions(1);
      const users = await User.getAll();
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('#create', () => {
    test('returns User', async () => {
      expect.assertions(1);
      const user = { name: 'User' };
      const newUser = await User.create(user);
      expect(newUser).toEqual(expect.objectContaining(user));
    });
  });

  describe('#get', () => {
    test('returns User', async () => {
      expect.assertions(1);
      const user = { name: 'User' };
      const expectedUser = await User.create(user);
      const actualUser = await User.get(expectedUser.id);
      expect(actualUser).toEqual(expectedUser);
    });
  });

  describe('#update', () => {
    test('updates User', async () => {
      expect.assertions(1);
      const user = await User.create({ name: 'User' });
      const newUser = { name: 'New User' };
      const expectedUser = await User.update(user.id, newUser);
      const actualUser = await User.get(expectedUser.id);
      expect(actualUser).toEqual(expectedUser);
    });
  });

  describe('#delete', () => {
    test('deletes User', async () => {
      expect.assertions(1);
      const user = await User.create({ name: 'User' });
      await User.delete(user.id);
      const deletedUser = await User.get(user.id);
      expect(deletedUser).toBeUndefined();
    });
  });
});
