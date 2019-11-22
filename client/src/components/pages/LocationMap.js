import React, { Component } from 'react';

class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount = () => {
    this.props.newPage();
  };

  render() {
    return (
      <section className='page page-location'>
        <div className="page-title">LocationMap page</div>
      </section>
    );
  }
}

export default LocationMap;