import React, { Component } from 'react';

class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      continent: 'europa',
      country: 'espana',
      city: 'madrid'
    };

    this.setContinent = this.setContinent.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  componentDidMount = () => {
    this.props.newPage();
  };

  setContinent(continent) {
    this.setState({ continent: continent, country: undefined, city: undefined });
  }

  setCountry(country) {
    this.setState({ country: country, city: undefined });
  }

  setCity(city) {
    this.setState({ city: city });
  }

  render() {
    const { continent, country, city } = this.state;

    const europa = (
      <ul className="list">
        <li onClick={this.setCountry}>ALEMANIA</li>
        <li onClick={this.setCountry}>AUSTRIA</li>
        <li onClick={this.setCountry}>BELGICA</li>
        <li onClick={this.setCountry}>BULGARIA</li>
        <li onClick={this.setCountry}>CHECOSLOVAQUIA</li>
        <li onClick={this.setCountry}>CHIPRE</li>
        <li onClick={this.setCountry}>DINAMARCA</li>
        <li onClick={this.setCountry}>ESLOVENIA</li>
        <li onClick={() => this.setCountry('espana')}>ESPAÑA</li>
        <li onClick={this.setCountry}>FINLANDIA</li>
        <li onClick={this.setCountry}>FRANCIA</li>
        <li onClick={this.setCountry}>GRAN BRETAÑA</li>
        <li onClick={this.setCountry}>GRECIA</li>
        <li onClick={this.setCountry}>HOLANDA</li>
        <li onClick={this.setCountry}>HUNGRIA</li>
        <li onClick={this.setCountry}>ISLANDIA Y GROENLANDIA</li>
        <li onClick={this.setCountry}>ITALIA</li>
        <li onClick={this.setCountry}>NORUEGA</li>
        <li onClick={this.setCountry}>POLONIA</li>
        <li onClick={this.setCountry}>PORTUGAL</li>
        <li onClick={this.setCountry}>PRINCIPADOS</li>
        <li onClick={this.setCountry}>RUMANIA</li>
        <li onClick={this.setCountry}>RUSIA</li>
        <li onClick={this.setCountry}>SUECIA</li>
        <li onClick={this.setCountry}>SUIZA</li>
        <li onClick={this.setCountry}>YUGOSLAVIA</li>
      </ul>
    );

    const america = (
      <ul className="list">
        <li onClick={this.setCountry}>ARGENTINA</li>
        <li onClick={this.setCountry}>BOLIVIA</li>
        <li onClick={this.setCountry}>BRASIL</li>
        <li onClick={this.setCountry}>CANADA</li>
        <li onClick={this.setCountry}>CENTROAMERICA</li>
        <li onClick={this.setCountry}>CHILE</li>
        <li onClick={this.setCountry}>COLOMBIA</li>
        <li onClick={this.setCountry}>CUBA</li>
        <li onClick={this.setCountry}>ECUADOR</li>
        <li onClick={this.setCountry}>MEJICO</li>
        <li onClick={this.setCountry}>PERU</li>
        <li onClick={this.setCountry}>USA</li>
        <li onClick={this.setCountry}>VENEZUELA</li>
      </ul>
    );

    const espana = (
      <ul className="list">
        <li onClick={this.setCity}>ANDALUCIA</li>
        <li onClick={this.setCity}>ARAGON</li>
        <li onClick={this.setCity}>ASTURIAS</li>
        <li onClick={this.setCity}>BALEARES</li>
        <li onClick={this.setCity}>CANARIAS</li>
        <li onClick={this.setCity}>CATALUÑA</li>
        <li onClick={this.setCity}>CANTABRIA</li>
        <li onClick={this.setCity}>CASTILLA LEON</li>
        <li onClick={this.setCity}>CASTILLA LA MANCHA</li>
        <li onClick={this.setCity}>EXTREMADURA</li>
        <li onClick={this.setCity}>EUSKADI</li>
        <li onClick={this.setCity}>GALICIA</li>
        <li onClick={this.setCity}>LA RIOJA</li>
        <li onClick={() => this.setCity('madrid')}>MADRID</li>
        <li onClick={this.setCity}>PLAZAS AFRICANAS</li>
        <li onClick={this.setCity}>MURCIA</li>
        <li onClick={this.setCity}>NAVARRA</li>
        <li onClick={this.setCity}>VALENCIA</li>
      </ul>
    );

    const madrid = (
      <ul className="list">
        <li>MADRID</li>
      </ul>
    );

    const nullList = (
      <ul className="list">
        <li />
      </ul>
    );
    return (
      <section className="page page-list">
        <div className="columns-wrapper">
          <div className="column">
            <ul className="list">
              <li onClick={() => this.setContinent('africa')}>ÁFRICA</li>
              <li onClick={() => this.setContinent('america')}>AMÉRICA</li>
              <li onClick={() => this.setContinent('asia')}>ASIA</li>
              <li onClick={() => this.setContinent('europa')}>EUROPA</li>
              <li onClick={() => this.setContinent('oceania')}>OCEANÍA</li>
            </ul>
          </div>
          <div className="column">
            {continent === 'europa' ? europa : continent === 'america' ? america : nullList}
          </div>
          <div className="column">{country === 'espana' ? espana : nullList}</div>
          <div className="column">{city === 'madrid' ? madrid : nullList}</div>
        </div>
      </section>
    );
  }
}

export default Lista;
