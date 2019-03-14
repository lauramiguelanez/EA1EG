import React, { Component } from 'react';

class Mapa extends Component {
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
      <section className='page page-mapa'>
        <div className="page-title">Mapa page</div>
      </section>
    );
  }
}

export default Mapa;