// @flow

import { connect } from 'react-redux';
import { branch, compose, lifecycle, renderNothing } from 'recompose';
import createImmutableSelector from 'create-immutable-selector';

import Project from './Project';
import { projectSelector, fetchProject } from './reducer';

const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.fetchProject();
  }
});

const mapStateToProps = createImmutableSelector(projectSelector, project => ({
  project
}));

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProject: () => {
    const { projectId } = ownProps.match.params;
    dispatch(fetchProject(projectId));
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withBranch = branch(({ project }) => !project, renderNothing);

const enhance = compose(withConnect, withLifecycle, withBranch);
export default enhance(Project);
