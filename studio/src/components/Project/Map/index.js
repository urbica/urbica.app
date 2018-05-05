import { connect } from 'react-redux';
import createImmutableSelector from 'create-immutable-selector';

import Map from './Map';
import { viewportSelector, changeViewport } from './reducer';
import {
  accessTokenSelector,
  styleSelector
  // projectSourcesSelector,
  // projectLayersSelector
} from '../reducer';

const mapStateToProps = createImmutableSelector(
  accessTokenSelector,
  styleSelector,
  // projectSourcesSelector,
  // projectLayersSelector,
  viewportSelector,
  (accessToken, style, viewport) => ({
    accessToken,
    style,
    // sources,
    // layers,
    ...viewport.toJS()
  })
);

const mapDispatchToProps = {
  onViewportChange: changeViewport
};

const enhance = connect(mapStateToProps, mapDispatchToProps);
export default enhance(Map);
