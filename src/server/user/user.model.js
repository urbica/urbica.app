// @flow

const db = require('../db');

type User = {
  id: number,
  team_id: number,
  name: string
};

type MaybeUser = {
  id?: number,
  team_id: number,
  name: string
};

// Get all Team Users
const getAll = (teamId: number): Promise<User[]> =>
  db.query('SELECT * FROM users WHERE team_id = $1', [teamId]).then(result => result.rows);

// Get User by id
const get = (userId: number): Promise<User> =>
  db.query('SELECT * FROM users WHERE id = $1', [userId]).then(result => result.rows[0]);

// Create new Team User
const create = (user: MaybeUser): Promise<User> =>
  db
    .query('INSERT INTO users(team_id, name) VALUES($1, $2) RETURNING *', [user.team_id, user.name])
    .then(result => result.rows[0]);

// Update existing Team User
const update = (userId: number, user: MaybeUser): Promise<User> =>
  db
    .query('UPDATE users SET team_id = $2, name = $3 WHERE id = $1 RETURNING *', [
      userId,
      user.team_id,
      user.name
    ])
    .then(result => result.rows[0]);

// Delete existing Team User
const del = (userId: number) => db.query('DELETE FROM users WHERE id = $1', [userId]);

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: del
};
