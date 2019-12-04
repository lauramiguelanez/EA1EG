import React, { Component } from 'react';
import mapConstants from './mapConstants';
import config from '../../config'

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );

    const newStyleMap = new window.google.maps.StyledMapType(mapConstants.STYLES, {
      name: 'MapStyled'
    });

    map.mapTypes.set('MapStyled', newStyleMap);
    map.setMapTypeId('MapStyled');

    this.props.onMapLoad(map);
  }

  

  componentDidMount() {
    const apiKey = config.gMapsKey;

    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${apiKey}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight }} id={this.props.id} />
    );
  }
}
