// @flow

const db = require('../db');
const Team = require('../team/team.model');
const Project = require('./project.model');

afterAll(() => db.end());

describe('Project', () => {
  let team;
  beforeEach(async () => (team = await Team.create({ name: 'Team' })));

  describe('#getAll', () => {
    test('returns array', async () => {
      expect.assertions(1);
      const projects = await Project.getAll(team.id);
      expect(projects).toBeInstanceOf(Array);
    });
  });

  describe('#create', () => {
    test('returns Project', async () => {
      expect.assertions(1);
      const project = { team_id: team.id, name: 'Project' };
      const newProject = await Project.create(project);
      expect(newProject).toEqual(expect.objectContaining(project));
    });
  });

  describe('#get', () => {
    test('returns Project', async () => {
      expect.assertions(1);
      const project = { team_id: team.id, name: 'Project' };
      const expectedProject = await Project.create(project);
      const actualProject = await Project.get(expectedProject.id);
      expect(actualProject).toEqual(expectedProject);
    });
  });

  describe('#update', () => {
    test('updates Project', async () => {
      expect.assertions(1);
      const project = await Project.create({ team_id: team.id, name: 'Project' });
      const newProject = { team_id: team.id, name: 'New Project' };
      const expectedProject = await Project.update(project.id, newProject);
      const actualProject = await Project.get(expectedProject.id);
      expect(actualProject).toEqual(expectedProject);
    });
  });

  describe('#delete', () => {
    test('deletes Project', async () => {
      expect.assertions(1);
      const project = await Project.create({ team_id: team.id, name: 'Project' });
      await Project.delete(project.id);
      const deletedProject = await Project.get(project.id);
      expect(deletedProject).toBeUndefined();
    });
  });
});
