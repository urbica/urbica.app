// @flow

const request = require('supertest');
const db = require('../db');
const server = require('../app');

let app;
beforeAll(() => {
  app = server.listen();
});

afterAll(() => {
  db.end();
  app.close();
});

describe('Team Controller', () => {
  describe('#index', () => {
    test('returns array', async () =>
      request(app)
        .get('/teams')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
        }));
  });

  describe('#create', () => {
    test('returns Team', async () => {
      const team = { name: 'Team' };
      const newTeam = await request(app)
        .post('/teams')
        .send(team)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      expect(newTeam).toEqual(expect.objectContaining(team));
    });
  });

  describe('#get', () => {
    test('returns Team', async () => {
      const team = { name: 'Team' };

      const expectedTeam = await request(app)
        .post('/teams')
        .send(team)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const actualTeam = await request(app)
        .get(`/teams/${expectedTeam.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualTeam).toEqual(expectedTeam);
    });

    test('returns 404 for nonexistent Team', async () => {
      const response = await request(app)
        .get('/teams/nonexistent')
        .expect('Content-Type', /text\/plain/)
        .expect(404)
        .then(res => res.text);

      expect(response).toEqual(expect.stringMatching(/Not Found/));
    });
  });

  describe('#update', () => {
    test('updates Team', async () => {
      const team = await request(app)
        .post('/teams')
        .send({ name: 'Team' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const newTeam = { name: 'New Team' };
      const expectedTeam = await request(app)
        .put(`/teams/${team.id}`)
        .send(newTeam)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      const actualTeam = await request(app)
        .get(`/teams/${expectedTeam.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualTeam).toEqual(expectedTeam);
    });
  });

  describe('#delete', () => {
    test('deletes Team', async () => {
      const team = await request(app)
        .post('/teams')
        .send({ name: 'Team' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      await request(app)
        .delete(`/teams/${team.id}`)
        .expect(204)
        .then(res => res.body);

      const response = await request(app)
        .get(`/teams/${team.id}`)
        .expect('Content-Type', /text\/plain/)
        .expect(404)
        .then(res => res.text);

      expect(response).toEqual(expect.stringMatching(/Couldn't find Team/));
    });
  });
});
