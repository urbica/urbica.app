const db = require('../db');

module.exports.getAll = () => db.query('SELECT * FROM users').then(({ rows }) => rows);

module.exports.get = userId =>
  db.query('SELECT * FROM users WHERE id = $1', [userId]).then(({ rows }) => rows[0]);

module.exports.create = attributes =>
  db
    .query('INSERT INTO users(name) VALUES($1) RETURNING *', [attributes.name])
    .then(({ rows }) => rows[0]);

module.exports.update = (userId, attributes) =>
  db
    .query('UPDATE users SET name = $2 WHERE id = $1 RETURNING *', [userId, attributes.name])
    .then(({ rows }) => rows[0]);

module.exports.delete = userId => db.query('DELETE FROM users WHERE id = $1', [userId]);
