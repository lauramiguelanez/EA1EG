import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import geolocalize from './maps/geolocalize';
import LocationMap from './maps/Map';
class ExploreMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`
    });
    /* geolocalize().then(center => {
      console.log(center);
      this.setState({ location: center });
    }); */
  }

  setRedirect = marker => {
    this.setState({
      redirect: true,
      url: marker
    });
  };

  getMarkers = () => {
    this.service.get('/postcard').then(cards => {
      this.setState({ cards: cards.data });
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      console.log(this.state.url);
      let url = `/card/${this.state.url}`;
      return <Redirect to={url} />;
    }
  };

  componentWillMount() {
    this.getMarkers();
    this.props.newPage();
  }

  render() {
    let cards = this.state.cards;

    return (
      <div>
        {this.renderRedirect()}
        <LocationMap
          id="myMap"
          options={{ /* center: this.state.location, */ zoom: 12 }}
          onMapLoad={map => {
            let markers = [];
            if (cards) {
              cards.forEach(card => {
                let marker = new window.google.maps.Marker({
                  position: card.location,
                  map: map,
                  // icon: "./marker.png",
                  url: card._id,
                  title: card.indicator
                });
                markers.push(marker);
              });
            }
            markers.forEach(marker => {
              marker.addEventListener('click', e => {
                this.setRedirect(marker.url);
                console.log(marker.url);
              });
            });
          }}
        />
      </div>
    );
  }
}

export default ExploreMap;
