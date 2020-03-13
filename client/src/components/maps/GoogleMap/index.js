import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import markersData from '../../data/markersData.json';
import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';
import mapStyles from './mapStyles.json';
import MapWrapper from './MapWrapper';

require('dotenv').config();

const MAP = {
  defaultZoom: 3,
  defaultCenter: { lat: 40.65724, lng: -4.69951 },
  options: {
    styles: mapStyles,
    maxZoom: 19
  },
  defaultBounds: {
    ne: { lat: 79.38631742290318, lng: 109.73408375000002 },
    nw: { lat: 79.38631742290318, lng: -119.13310375 },
    se: { lat: -42.47864326641228, lng: 109.73408375000002 },
    sw: { lat: -42.47864326641228, lng: -119.13310375 }
  }
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
      bounds: MAP.defaultBounds
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
    // console.log('this.props.locations', locations);
    // console.log('this.state.clusters', this.state.clusters);
    // console.log('this.state.mapOptions', this.state.mapOptions);

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

  filterSelection(points) {
    const { locations } = this.props;

    /* info={markersData.find(
      m => m.lat === item.points[0].lat && m.lng === item.points[0].lng
    )} */

    const filtered = markersData.filter(l => {
      points.reduce((acc, { lat, lng }) => {
        return acc || (lat === l.lat && lng === l.lng);
      });
    });

    console.log('filtered', filtered);
    return filtered;
  }

  render() {
    console.log('KEY', process.env.REACT_APP_API_KEY_MAP);
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_MAP }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  onClick={() => this.filterSelection([item.points[0]])}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
                onClick={() => this.filterSelection(item.points)}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;