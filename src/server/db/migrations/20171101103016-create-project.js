exports.up = db =>
  db.createTable('projects', {
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
    }
  });

exports.down = db => db.dropTable('projects');
