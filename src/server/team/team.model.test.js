// @flow

const db = require('../db');
const Team = require('./team.model');

afterAll(() => db.end());

describe('Team', () => {
  describe('#getAll', () => {
    test('returns array', async () => {
      expect.assertions(1);
      const teams = await Team.getAll();
      expect(teams).toBeInstanceOf(Array);
    });
  });

  describe('#create', () => {
    test('returns Team', async () => {
      expect.assertions(1);
      const team = { name: 'Team' };
      const newTeam = await Team.create(team);
      expect(newTeam).toEqual(expect.objectContaining(team));
    });
  });

  describe('#get', () => {
    test('returns Team', async () => {
      expect.assertions(1);
      const team = { name: 'Team' };
      const expectedTeam = await Team.create(team);
      const actualTeam = await Team.get(expectedTeam.id);
      expect(actualTeam).toEqual(expectedTeam);
    });
  });

  describe('#update', () => {
    test('updates Team', async () => {
      expect.assertions(1);
      const team = await Team.create({ name: 'Team' });
      const newTeam = { name: 'New Team' };
      const expectedTeam = await Team.update(team.id, newTeam);
      const actualTeam = await Team.get(expectedTeam.id);
      expect(actualTeam).toEqual(expectedTeam);
    });
  });

  describe('#delete', () => {
    test('deletes Team', async () => {
      expect.assertions(1);
      const team = await Team.create({ name: 'Team' });
      await Team.delete(team.id);
      const deletedTeam = await Team.get(team.id);
      expect(deletedTeam).toBeUndefined();
    });
  });
});
