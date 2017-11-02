// @flow

const request = require('supertest');
const db = require('../db');
const server = require('../app');
const Team = require('../team/team.model');

let app;
beforeAll(() => {
  app = server.listen();
});

afterAll(() => {
  db.end();
  app.close();
});

describe('Project Controller', () => {
  let team;
  beforeEach(async () => (team = await Team.create({ name: 'Team' })));

  describe('#index', () => {
    test('returns array', async () =>
      request(app)
        .get(`/teams/${team.id}/projects`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
        }));
  });

  describe('#create', () => {
    test('returns Project', async () => {
      const project = { name: 'Project' };
      const newProject = await request(app)
        .post(`/teams/${team.id}/projects`)
        .send(project)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      expect(newProject).toEqual(expect.objectContaining(project));
    });
  });

  describe('#get', () => {
    test('returns Project', async () => {
      const project = { name: 'Project' };

      const expectedProject = await request(app)
        .post(`/teams/${team.id}/projects`)
        .send(project)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const actualProject = await request(app)
        .get(`/teams/${team.id}/projects/${expectedProject.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualProject).toEqual(expectedProject);
    });

    test('returns 404 for nonexistent Project', async () => {
      const response = await request(app)
        .get(`/teams/${team.id}/projects/nonexistent`)
        .expect('Content-Type', /text\/plain/)
        .expect(404)
        .then(res => res.text);

      expect(response).toEqual(expect.stringMatching(/Not Found/));
    });
  });

  describe('#update', () => {
    test('updates Project', async () => {
      const project = await request(app)
        .post(`/teams/${team.id}/projects`)
        .send({ name: 'Project' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const newProject = { ...project, name: 'New Project' };
      const expectedProject = await request(app)
        .put(`/teams/${team.id}/Projects/${project.id}`)
        .send(newProject)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      const actualProject = await request(app)
        .get(`/teams/${team.id}/projects/${expectedProject.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualProject).toEqual(expectedProject);
    });
  });

  describe('#delete', () => {
    test('deletes Project', async () => {
      const project = await request(app)
        .post(`/teams/${team.id}/projects`)
        .send({ name: 'Project' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      await request(app)
        .delete(`/teams/${team.id}/projects/${project.id}`)
        .expect(204)
        .then(res => res.body);

      const response = await request(app)
        .get(`/teams/${team.id}/projects/${project.id}`)
        .expect('Content-Type', /text\/plain/)
        .expect(404)
        .then(res => res.text);

      expect(response).toEqual(expect.stringMatching(/Couldn't find Project/));
    });
  });
});
