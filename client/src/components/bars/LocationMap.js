import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleMap from '../maps/GoogleMap/index.js';

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMarkers = () => {
    const locations = this.props.cards.map(c => ({
      lat: c.location.lat,
      lng: c.location.lng,
      id: c._id
    }));
    this.setState({ locations });
    console.log('markers', locations);
  };

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
    const { locations } = this.state;
    const { cards } = this.props;
    if (!locations && cards) {
      this.getMarkers();
    }
    return (
      <section>
        <GoogleMap locations={locations}></GoogleMap>
      </section>
    );
  }
}

export default LocationMap;

/* export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap); */
