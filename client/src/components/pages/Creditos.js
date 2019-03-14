import React, { Component } from 'react';

class Creditos extends Component {
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
      <section className="page page-creditos">
        <div className="page-title">Creditos page</div>
        <div className="two-columns-wrapper">
          <div className="column">
            <p>
              El archivo base del proyecto se compone de una extensa coleecion de postales QSL
              producida a lo largo de la trayectoria
            </p>
            <p>Diseño web</p>
            <p>Programación</p>
            <p>Escaneado y archivo</p>
          </div>
          <div className="column">
            <p>AGRADECIMIENTOS</p>
            <p>Carmen Santacana Abella</p>
            <p>Alfredo Abella</p>
            <p>Rosario Rabanal Martínez</p>
            <p>U.R.E.</p>
            <p>A.R.I.E.S.</p>
          </div>
        </div>
        <div className="figure figure-creditos">
        IMAGEN
        </div>
      </section>
    );
  }
}

export default Creditos;
