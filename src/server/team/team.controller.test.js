// @flow

const request = require('supertest');
const db = require('../db');
const app = require('../app');

afterAll(() => db.end());

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

      const error = await request(app)
        .get(`/teams/${team.id}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => res.body);

      expect(error.message).toEqual(expect.stringMatching(/Couldn't find Team/));
    });
  });
});
