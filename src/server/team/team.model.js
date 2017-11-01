// @flow

const db = require('../db');

type Team = {
  id: number,
  name: string
};

type MaybeTeam = {
  id?: number;
  name: string;
};

// get all Teams
const getAll = (): Promise<Team[]> => db.query('SELECT * FROM teams').then(result => result.rows);

// get Team by id
const get = (teamId: number): Promise<Team> =>
  db.query('SELECT * FROM teams WHERE id = $1', [teamId]).then(result => result.rows[0]);

// create new Team
const create = (team: MaybeTeam): Promise<Team> =>
  db
    .query('INSERT INTO teams(name) VALUES($1) RETURNING *', [team.name])
    .then(result => result.rows[0]);

// update existing Team by id
const update = (teamId: number, team: MaybeTeam): Promise<Team> =>
  db
    .query('UPDATE teams SET name = $2 WHERE id = $1 RETURNING *', [teamId, team.name])
    .then(result => result.rows[0]);

// delete existing Team by id
const del = (teamId: number) => db.query('DELETE FROM teams WHERE id = $1', [teamId]);

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: del
};
