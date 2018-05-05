// @flow

import React, { PureComponent } from 'react';
import MapGL from '@urbica/react-map-gl';
// import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import styled from 'styled-components';
import Immutable from 'immutable';
import 'mapbox-gl/dist/mapbox-gl.css';

const StyledMapGL = styled(MapGL)`
  width: 100%;
  height: 100%;
  left: 360px;
  z-index: 1;
`;

type Props = {
  accessToken: string,
  style: Immutable.Map<string, any>,
  sources: Immutable.Map<string, VectorSourceSpecification>,
  layers: Immutable.Map<string, LayerSpecification>,
  onViewportChange: (viewport: Viewport) => void
};

class Map extends PureComponent<Props> {
  _map: MapboxMap;
  _mapRef: MapGL;
  onZoomend: Function;

  constructor(props: Props) {
    super(props);
    this.onZoomend = this.onZoomend.bind(this);
  }

  componentDidMount() {
    this._map = this._mapRef && this._mapRef.getMap();
    window.map = this._map;

    if (this._map) {
      this._map.on('zoomend', this.onZoomend);
    }
  }

  // TODO: https://github.com/mapbox/mapbox-gl-js/issues/6047
  onZoomend() {
    const { lng, lat } = this._map.getCenter();
    const zoom = this._map.getZoom();
    const pitch = this._map.getPitch();
    const bearing = this._map.getBearing();

    const viewport = {
      latitude: lat,
      longitude: lng,
      zoom,
      pitch,
      bearing
    };

    this.props.onViewportChange(viewport);
  }

  render() {
    const {
      accessToken, style, sources, layers, ...restProps
    } = this.props;

    if (!style) {
      return null;
    }

    return (
      <StyledMapGL
        mapStyle={style.get('url')}
        accessToken={accessToken}
        innerRef={(ref) => {
          this._mapRef = ref;
        }}
        {...restProps}
      >
        {/* {sources.entrySeq().map(([id, source]) => <Source key={id} id={id} source={source} />)}
        {layers.entrySeq().map(([id, layer]) => <Layer key={id} layer={layer} />)} */}
      </StyledMapGL>
    );
  }
}

export default Map;
