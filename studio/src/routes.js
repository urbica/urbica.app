// @flow

import Home from './components/Home';
import Project from './components/Project';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/:projectId',
    component: Project
  }
];

export default routes;
