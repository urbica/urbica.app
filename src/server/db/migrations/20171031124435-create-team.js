/* eslint-disable no-new-wrappers */

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
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('NOW()')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('NOW()')
    },
    deleted_at: {
      type: 'timestamp',
      notNull: false
    }
  });

exports.down = db => db.dropTable('teams');
