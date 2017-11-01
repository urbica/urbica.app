exports.up = db =>
  db.createTable('teams', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      notNull: true
    }
  });

exports.down = db => db.dropTable('teams');
