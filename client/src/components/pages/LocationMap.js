import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
// import mapConstants from '../maps/mapConstants';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

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

  onMarkerClick(id) {
    console.log('You clicked me!');
  }

  displayMarkers = () => {
    const { cards } = this.state;
    if (cards) {
      return cards.map((card, index) => {
        const { location, indicator } = card;
        if (location) {
          const { lat, lng } = location;
          return (
            <Marker
              key={index}
              id={index}
              name={indicator}
              position={{
                lat,
                lng
              }}
              onClick={id => this.onMarkerClick(id)}
              /* icon={{
                url: "/img/mao/mapIcon.svg",
                anchor: new window.google.maps.Point(32,32),
                scaledSize: new window.google.maps.Size(64,64)
              }}  */
            />
          );
        }
      });
    }
  };

  render() {
    const mapStyles = /* mapConstants.STYLES/* */ {
      width: '100%',
      height: '100%'
    };

    return (
      <section className="page page-location">
        {/* <div className="page-title">LocationMap page</div> */}
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 40.65724, lng: -4.69951 }} // Ávila
        >
          {this.displayMarkers()}
        </Map>
      </section>
    );
  }
}

// export default LocationMap;

export default GoogleApiWrapper({
  apiKey: config.gMapsKey
})(LocationMap);
