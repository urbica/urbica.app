/* eslint-disable import/prefer-default-export */

// import { isImmutable } from 'immutable';
import { fetchJSON } from '../utils';

// // team

// export const fetchTeams = () => fetchJSON('/api/teams/');

// export const fetchTeam = (teamId: string) => fetchJSON(`/api/teams/${teamId}`);

// export const fetchTeamStyles = (teamId: string) => fetchJSON(`/api/teams/${teamId}/styles`);

// export const fetchTeamProjects = (teamId: string) => fetchJSON(`/api/teams/${teamId}/projects`);

// export const createTeam = (team: Object) =>
//   fetchJSON('/api/teams/', {
//     body: JSON.stringify(team),
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   });

// // project

export const fetchProject = projectId => fetchJSON(`/api/v1/projects/${projectId}`);

// export const createProject = (project: Object) =>
//   fetchJSON(`/api/teams/${project.team}/projects/`, {
//     body: JSON.stringify(project),
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   });

// export const createSource = (teamId: string, projectId: string, source: Object) => {
//   const formData = new FormData();
//   formData.append('id', source.id);
//   formData.append('source', source.file);

//   return fetchJSON(`/api/teams/${teamId}/projects/${projectId}/sources/`, {
//     body: formData,
//     method: 'POST'
//   });
// };

// export const createLayer = (teamId: string, projectId: string, layer: Object) => {
//   return fetchJSON(`/api/teams/${teamId}/projects/${projectId}/layers/`, {
//     body: JSON.stringify(layer),
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   });
// };

// export const publishProject = (project: Object) => {
//   const params = isImmutable(project) ? project.toJS() : project;
//   return fetchJSON(`/api/teams/${params.team}/projects/${params._id}`, {
//     body: JSON.stringify(params),
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' }
//   });
// };
