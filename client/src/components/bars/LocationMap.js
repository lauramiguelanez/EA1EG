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

  getMarkers = () => {
    // const locations = /* this.props.cards */ markersData.map(c => ({
    //   lat: c.location.lat,
    //   lng: c.location.lng,
    //   id: c._id,
    //   indicator: c.indicator
    // }));
   /*  var dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(locations));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", 'markersData' + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove(); */

    this.setState({ locations: markersData });
    console.log('markers', markersData);
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
    /* if (!locations && cards) {
      this.getMarkers();
    } */
    return (
      <section>
        <GoogleMap locations={/* locations */ markersData}></GoogleMap>
      </section>
    );
  }
}

export default LocationMap;

/* export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap); */
