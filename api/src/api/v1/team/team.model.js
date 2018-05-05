// @flow

const mongoose = require('mongoose');
const Docker = require('dockerode');
const { Project } = require('../project/project.model');
const { styleSchema } = require('../style/style.model');

const docker = new Docker({ socketPath: '/tmp/docker.sock' });

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  mapbox_access_token: {
    type: String,
    required: true
  },
  styles: {
    type: [styleSchema],
    required: false
  },
  database_container_id: {
    type: String
  },
  martin_container_id: {
    type: String
  }
});

teamSchema.method('projects', function projects(projection) {
  return Project.find({ team: this._id }, projection);
});

teamSchema.method('getDatabaseContainer', function getDatabaseContainer() {
  return docker.getContainer(this.database_container_id);
});

teamSchema.method('getMartinContainer', function getMartinContainer() {
  return docker.getContainer(this.martin_container_id);
});

teamSchema.pre('save', async function save() {
  if (this.isNew) {
    const networkName = `${this._id}_network`;

    const network = await docker.createNetwork({
      Name: networkName,
      Driver: 'bridge'
    });

    const POSTGRES_DB = 'db';
    const POSTGRES_USER = 'postgres';
    const POSTGRES_HOST = `${this._id}_database`;

    // TODO: allow user to select database image
    const databaseContainer = await docker.createContainer({
      Image: 'urbica/postgis:debian',
      name: POSTGRES_HOST,
      RestartPolicy: {
        Name: 'unless-stopped'
      },
      Env: [`POSTGRES_DB=${POSTGRES_DB}`, `POSTGRES_USER=${POSTGRES_USER}`],
      HostConfig: {
        PortBindings: {
          '5432/tcp': [{ HostIP: '0.0.0.0' }]
        }
      },
      Healthcheck: {
        Test: ['CMD-SHELL', 'pg_isready -U $POSTGRES_USER'],
        Interval: 30 * 10 * 1000000,
        Timeout: 30 * 10 * 1000000,
        Retries: 3
      }
    });

    this.database_container_id = databaseContainer.id;
    await network.connect({ Container: databaseContainer.id });
    await databaseContainer.start();

    const MARTIN_HOST = `${this._id}_martin`;
    const DATABASE_URL = `postgres://${POSTGRES_USER}@${POSTGRES_HOST}/${POSTGRES_DB}`;
    const martinContainer = await docker.createContainer({
      Image: 'urbica/martin',
      name: MARTIN_HOST,
      RestartPolicy: {
        Name: 'unless-stopped'
      },
      Env: [`DATABASE_URL=${DATABASE_URL}`, 'RUST_LOG=actix_web=info,martin=debug']
    });

    this.martin_container_id = martinContainer.id;
    await network.connect({ Container: martinContainer.id });
    await martinContainer.start();
  }
});

teamSchema.post('remove', async function remove() {
  const martinContainer = this.getMartinContainer();
  if (martinContainer) {
    // TODO: handle if container is already stopped
    await martinContainer.stop();

    // TODO: handle if container is already removed
    await martinContainer.remove();
  }

  const databaseContainer = this.getDatabaseContainer();
  if (databaseContainer) {
    // TODO: handle if container is already stopped
    await databaseContainer.stop();

    // TODO: handle if container is already removed
    await databaseContainer.remove();
  }

  // TODO: remove network
  // const networkName = `${this._id}_network`;
  // await docker.createNetwork({ id: networkName });
});

// teamSchema.method('sources', function() {
//   const url = this.martin;
//   return fetchJSON(`${url}/index.json`).then(sources =>
//     Object.keys(sources).reduce((acc, sourceId) => {
//       acc[sourceId] = {
//         id: sourceId,
//         type: 'vector',
//         metadata: {
//           name: sourceId
//         },
//         tiles: [`${url}/${sourceId}/{z}/{x}/{y}.pbf`]
//       };
//       return acc;
//     }, {})
//   );
// });

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team, teamSchema };
