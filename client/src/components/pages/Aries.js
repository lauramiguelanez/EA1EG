import React, { Component } from 'react';

class Aries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount = () => {
    //this.props.newPage();
  };

  render() {
    return (
      <section className='page page-aries'>
        <div>Aries page</div>
      </section>
    );
  }
}

export default Aries;