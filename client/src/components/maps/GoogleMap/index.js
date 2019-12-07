import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import config from '../../../config';

import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';

import mapStyles from './mapStyles.json';
import { markersData } from '../location data';

import MapWrapper from './MapWrapper';

const MAP = {
  defaultZoom: 8,
  defaultCenter: { lat: 40.65724, lng: -4.69951 },
  options: {
    styles: mapStyles,
    maxZoom: 19
  }
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
      bounds: {
        ne: { lat: 42.79291862306698, lng: -1.1234601953125036 },
        nw: { lat: 42.79291862306698, lng: -8.275559804687504 },
        se: { lat: 38.45093983206192, lng: -1.1234601953125036 },
        sw: { lat: 38.45093983206192, lng: -8.275559804687504 }
      }
    },
    clusters: []
  };

  getClusters = () => {
    const { locations } = this.props;
    console.log('getClusters', locations);
    const clusters = supercluster(locations, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points
          }))
        : []
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    const { locations } = this.props;
    console.log('this.props.locations', locations);
    console.log('this.state.clusters', this.state.clusters);
    console.log('this.state.mapOptions', this.state.mapOptions);

    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        if (locations) {
          this.createClusters(this.props);
        }
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: config.gMapsKey }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return <Marker key={item.id} lat={item.points[0].lat} lng={item.points[0].lng} />;
            }

            return (
              <ClusterMarker key={item.id} lat={item.lat} lng={item.lng} points={item.points} />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
