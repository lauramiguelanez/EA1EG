import React, { Component } from 'react';

class Lista extends Component {
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
      <section className='page page-lista'>
        <div className="page-title">Lista page</div>
      </section>
    );
  }
}

export default Lista;