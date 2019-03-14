import React, { Component } from 'react';

class Contacto extends Component {
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
      <section className="page page-contacto">
        <div className="page-title">Contact page</div>
        <div className="figure figure-contacto">
        IMAGEN
        </div>
      </section>
    );
  }
}

export default Contacto;
