import React, { useState, useEffect } from 'react';
import locationTree from '../data/locationTree.json';
import ListColumn from './elements/ListColumn';

const flatLocations = [];
const flat = () => {
  locationTree.forEach((a) => {
    a.type = 'continent';
    a.parent = null;
    flatLocations.push(a);
    a.children.forEach((b) => {
      b.type = 'country';
      b.parent = a;
      flatLocations.push(b);
      b.children.forEach((c) => {
        c.type = 'city';
        c.parent = b;
        flatLocations.push(c);
        c.children.forEach((d) => {
          d.type = 'town';
          d.parent = c;
          flatLocations.push(d);
        });
      });
    });
  });
};
flat();

const List = ({ setRegion, region, t }) => {
  const continents = locationTree;
  const [continent, setContinent] = useState('europa');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [town, setTown] = useState(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);

  const setRegionFromUrl = () => {
    if (region) {
      let reg = flatLocations.find((l) => l.name.toLowerCase === region.toLowerCase);
      if (reg) {
        switch (reg.type) {
          case 'continent':
            setContinent(reg.name);
            setCountries(reg.children);
            break;
          case 'country':
            setCountry(reg.name);
            setContinent(reg.parent.name);
            setCountries(reg.parent.children);
            setCities(reg.children);
            break;
          case 'city':
            setCity(reg.name);
            setCountry(reg.parent.name);
            setContinent(reg.parent.parent.name);
            setTowns(reg.children);
            setCities(reg.parent.children);
            setCountries(reg.parent.parent.children);
            break;
          case 'town':
            setTown(reg.name);
            setCity(reg.parent.name);
            setCountry(reg.parent.parent.name);
            setContinent(reg.parent.parent.parent.name);
            setTowns(reg.parent.children);
            setCities(reg.parent.parent.children);
            setCountries(reg.parent.parent.parent.children);
            break;
          default:
            break;
        }
      }
    }
  };

  useEffect(setRegionFromUrl, []);

  const setContinentData = (continentObj) => {
    setCountries(continentObj.children);
    setCities([]);
    setTowns([]);

    setContinent(continentObj.name);
    setCountry(null);
    setCity(null);
    setTown(null);

    setRegion(continentObj.name);
  };

  const setCountryData = (countryObj) => {
    setCities(countryObj.children);
    setTowns([]);

    setCountry(countryObj.name);
    setCity(null);
    setTown(null);

    setRegion(countryObj.name);
  };

  const setCityData = (cityObj) => {
    setTowns(cityObj.children);

    setCity(cityObj.name);
    setTown(null);

    setRegion(cityObj.name);
  };

  const setTownData = (townObj) => {
    setTown(townObj.name);
    setRegion(townObj.name);
  };

  return (
    <section className="page page-list">
      <div className="columns-wrapper">
        <ListColumn array={continents} selectedItem={continent} setItem={setContinentData} t={t} />
        <ListColumn array={countries} selectedItem={country} setItem={setCountryData} t={t}/>
        <ListColumn array={cities} selectedItem={city} setItem={setCityData} t={t}/>
        <ListColumn array={towns} selectedItem={town} setItem={setTownData} t={t}/>
      </div>
    </section>
  );
};

export default List;
