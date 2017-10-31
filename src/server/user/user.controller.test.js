// @flow

const request = require('supertest');
const db = require('../db');
const app = require('../app');

afterAll(() => db.end());

describe('User Controller', () => {
  describe('#index', () => {
    test('returns array', async () =>
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
        }));
  });

  describe('#create', () => {
    test('returns User', async () => {
      const user = { name: 'User' };
      const newUser = await request(app)
        .post('/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      expect(newUser).toEqual(expect.objectContaining(user));
    });
  });

  describe('#get', () => {
    test('returns User', async () => {
      const user = { name: 'User' };

      const expectedUser = await request(app)
        .post('/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const actualUser = await request(app)
        .get(`/users/${expectedUser.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualUser).toEqual(expectedUser);
    });
  });

  describe('#update', () => {
    test('updates User', async () => {
      const user = await request(app)
        .post('/users')
        .send({ name: 'User' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      const newUser = { name: 'New User' };
      const expectedUser = await request(app)
        .put(`/users/${user.id}`)
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      const actualUser = await request(app)
        .get(`/users/${expectedUser.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => res.body);

      expect(actualUser).toEqual(expectedUser);
    });
  });

  describe('#delete', () => {
    test('deletes User', async () => {
      const user = await request(app)
        .post('/users')
        .send({ name: 'User' })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => res.body);

      await request(app)
        .delete(`/users/${user.id}`)
        .expect(204)
        .then(res => res.body);

      const error = await request(app)
        .get(`/users/${user.id}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(res => res.body);

      expect(error.message).toEqual(expect.stringMatching(/Couldn't find User/));
    });
  });
});
