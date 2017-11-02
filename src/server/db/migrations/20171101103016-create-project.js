/* eslint-disable no-new-wrappers */

exports.up = db =>
  db.createTable(
    'projects',
    {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      team_id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'projects_team_id_fkey',
          table: 'teams',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
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
    },
    () => db.addIndex('projects', 'projects_id_team_id_idx', ['id', 'team_id'])
  );

exports.down = db => db.dropTable('projects');
