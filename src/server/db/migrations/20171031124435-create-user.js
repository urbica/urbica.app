exports.up = db =>
  db.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    name: 'string'
  });

exports.down = db => db.dropTable('users');
