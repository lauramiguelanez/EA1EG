import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import locationTree from '../data/locationTree.json';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      continent: 'europa',
      country: 'espana',
      city: 'madrid',
      continents: locationTree,
      countries: locationTree[0].children,
      cities: locationTree[0].children[0].children,
      towns: locationTree[0].children[0].children[13].children,
    };
    this.setRegion = props.setRegion;
    this.setContinent = this.setContinent.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setCity = this.setCity.bind(this);
  }

  setContinent(continentObj) {
    const countries = continentObj.children;
    this.setState({ continent: continentObj.name, country: undefined, city: undefined, countries });
    this.setRegion(continentObj.name);
  }

  setCountry(countryObj) {
    const cities = countryObj.children;
    this.setState({ country: countryObj.name, city: undefined, cities });
    this.setRegion(countryObj.name);
  }

  setCity(cityObj) {
    const towns = cityObj.children;
    this.setState({ city: cityObj.name, towns });
    this.setRegion(cityObj.name);
  }

  setTown(townObj) {
    this.setState({ town: townObj.name });
    this.setRegion(townObj.name);
  }

  render() {
    const { continent, country, city, continents, countries, cities } = this.state;

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
              {continents.map(c => (
                <NavLink
                  key={c.name}
                  className="nav-link"
                  to={`/region/${c.name}`}
                  onClick={() => this.setContinent(c)}
                >
                  <li>{c.name.toUpperCase()}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="column">
            <ul className="list">
              {countries.map(c => (
                <NavLink
                  key={c.name}
                  className="nav-link"
                  to={`/region/${c.name}`}
                  onClick={() => this.setCountry(c)}
                >
                  <li>{c.name.toUpperCase()}</li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="column">
            <ul className="list">
              {cities.map(c => (
                <NavLink
                  key={c.name}
                  className="nav-link"
                  to={`/region/${c.name}`}
                  onClick={() => this.setCity(c)}
                >
                  <li>{c.name.toUpperCase()}</li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default List;
