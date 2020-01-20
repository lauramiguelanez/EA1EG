import React, { useState, useEffect } from 'react';
import Navbar from './bars/Navbar';
import FilteredPostcards from './FilteredPostcards';
import YearBar from './AllPostYearBarcards';
import List from './List';
import LocationMap from './LocationMap';

import axios from 'axios';
require('dotenv').config();

const { window } = global;
const { innerWidth, innerHeight } = window;

const PostCards = ({ page, newPage }) => {
  // /////// STATE:
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [cards, setCards] = useState(null);

  // /////// CONSTANTS:

  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });
  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

  // /////// SET STATE:

  const setYearOnly = y => {
    setRegion();
    setYear(y);
  };

  const setRegionOnly = r => {
    setRegion(r);
    setYear();
  };

  // /////// GET DATA:

  const getCards = (y, r) => {
    let gotCards;
    let route = '/postcard';
    if (y && !r) {
      route = `/year/${year}`;
    } else if (r && !y) {
      route = `/region/${region}`;
    } else if (r && y) {
      //
    }

    return service
      .get(route)
      .then(cards => {
        gotCards = cards.data;
        console.log('gotCards', gotCards);
        setCards(gotCards);
      })
      .catch(error => console.log(error));
  };

  // /////// COMPONENT UPDATE:

  useEffect(() => {
    newPage();
  }, []);

  useEffect(() => {
    getCards(year, region);
  }, [year, region]);

  // /////// RENDER:

  const renderPage = () => {
    switch (page) {
      case 'List':
        return <List region={region} setRegion={setRegionOnly} />;
      case 'Map':
        return <LocationMap />;
      case 'Years':
        return <YearBar page={page} year={year} setYear={setYearOnly} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderPage()}
      <FilteredPostcards cards={cards} />
    </div>
  );
};

export default PostCards;
