import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleMap from '../maps/GoogleMap/index.js';
import markersData from '../data/markersData.json';

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setRedirect = marker => {
    this.setState({
      redirect: true,
      url: marker
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      console.log(this.state.url);
      let url = `/card/${this.state.url}`;
      return <Redirect to={url} />;
    }
  };

  render() {
    return (
      <section>
        <GoogleMap locations={markersData}></GoogleMap>
      </section>
    );
  }
}

export default LocationMap;

/* export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap); */
