// @flow

const db = require('../db');

type Project = {
  id: number,
  team_id: number,
  name: string
};

type MaybeProject = {
  id?: number,
  team_id: number,
  name: string
};

// Get all Team Projects
const getAll = (teamId: number): Promise<Project[]> =>
  db.query('SELECT * FROM projects WHERE team_id = $1', [teamId]).then(result => result.rows);

// Get Project by id
const get = (projectId: number): Promise<Project> =>
  db.query('SELECT * FROM projects WHERE id = $1', [projectId]).then(result => result.rows[0]);

// Create new Team Project
const create = (project: MaybeProject): Promise<Project> =>
  db
    .query('INSERT INTO projects(team_id, name) VALUES($1, $2) RETURNING *', [
      project.team_id,
      project.name
    ])
    .then(result => result.rows[0]);

// Update existing Team Project
const update = (projectId: number, project: MaybeProject): Promise<Project> =>
  db
    .query('UPDATE projects SET team_id = $2, name = $3 WHERE id = $1 RETURNING *', [
      projectId,
      project.team_id,
      project.name
    ])
    .then(result => result.rows[0]);

// Delete existing Team Project
const del = (projectId: number) => db.query('DELETE FROM projects WHERE id = $1', [projectId]);

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: del
};
