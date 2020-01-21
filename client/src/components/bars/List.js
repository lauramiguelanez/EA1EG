import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import locationTree from '../data/locationTree.json';
import ListItem from './elements/ListItem';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      continent: 'europa',
      country: 'espana',
      city: 'madrid',
      town: null,
      continents: locationTree,
      countries: locationTree[0].children,
      cities: locationTree[0].children[0].children,
      towns: locationTree[0].children[0].children[13].children
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
    const { continent, country, city, town, continents, countries, cities, towns } = this.state;

    return (
      <section className="page page-list">
        <div className="columns-wrapper">
          <ListItem array={continents} selectedItem={continent} setItem={this.setContinent} />
          <ListItem array={countries} selectedItem={country} setItem={this.setCountry} />
          <ListItem array={cities} selectedItem={city} setItem={this.setCity} />
          <ListItem array={towns} selectedItem={town} setItem={this.setTown} />
        </div>
      </section>
    );
  }
}

export default List;
