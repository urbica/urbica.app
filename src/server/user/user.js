// @flow

const db = require('../db');

type User = {
  id: number,
  name: string
};

// get all Users
const getAll = (): Promise<User[]> => db.query('SELECT * FROM users').then(result => result.rows);

// get User by id
const get = (userId: number): Promise<User> =>
  db.query('SELECT * FROM users WHERE id = $1', [userId]).then(result => result.rows[0]);

// create new User
const create = (attributes: User): Promise<User> =>
  db
    .query('INSERT INTO users(name) VALUES($1) RETURNING *', [attributes.name])
    .then(result => result.rows[0]);

// update existing User by id
const update = (userId: number, attributes: User): Promise<User> =>
  db
    .query('UPDATE users SET name = $2 WHERE id = $1 RETURNING *', [userId, attributes.name])
    .then(result => result.rows[0]);

// delete existing User by id
const del = (userId: number): Promise<any> => db.query('DELETE FROM users WHERE id = $1', [userId]);

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: del
};
