import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
      const locations = cards.data.map(c => ({ lat: c.location.lat, lng: c.location.lng, id: c._id }));
      this.setState({ cards: cards.data, locations });
      console.log('markers', locations);
      // this.downloadObjectAsJson(locations, 'locations');
    });
  };

  downloadObjectAsJson(exportObj, exportName) {
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
    const { locations } = this.state;
    return (
      <section /* className="page page-location" */>
        <GoogleMap locations={locations}></GoogleMap>
      </section>
    );
  }
}

export default LocationMap;

/* export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap); */
