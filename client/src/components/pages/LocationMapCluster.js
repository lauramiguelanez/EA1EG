import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
// import mapConstants from '../maps/mapConstants';
import GoogleMap from '../maps/GoogleMap/index.js';

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`
    });
  }

  componentDidMount = () => {
    this.props.newPage();
    this.getMarkers();
  };

  getMarkers = () => {
    this.service.get('/postcard').then(cards => {
      this.setState({ cards: cards.data });
      console.log('markers', cards);
    });
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
    return (
      <section /* className="page page-location" */>
        <GoogleMap></GoogleMap>
      </section>
    );
  }
}

export default LocationMap;

/* export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap); */
