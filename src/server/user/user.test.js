// @flow

// const db = require('../db');
const User = require('./user');

test('User#create', () => {
  const attributes = { id: 1, name: 'User' };
  User.create(attributes).then(user => expect(user).toEqual(attributes));
});

test('User#get', () => {
  const attributes = { id: 1, name: 'User' };
  User.get(attributes.id).then(user => expect(user).toEqual(attributes));
});

test('User#update', () => {
  const attributes = { id: 1, name: 'New User' };
  User.update(attributes.id, attributes).then(user => expect(user).toEqual(attributes));
});

test('User#delete', () => {
  const attributes = { id: 1, name: 'User' };
  User.delete(attributes.id).then(() =>
    User.get(attributes.id).then(user => expect(user).toBeUndefined()));
});
