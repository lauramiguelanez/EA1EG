import React, { Component } from 'react';

class Dates extends Component {
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
    return <section />;
  }
}

export default Dates;


