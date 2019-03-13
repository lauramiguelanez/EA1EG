import React, { Component } from 'react';

class Creditos extends Component {
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
      <section className='page page-creditos'>
        <div>Creditos page</div>
      </section>
    );
  }
}

export default Creditos;