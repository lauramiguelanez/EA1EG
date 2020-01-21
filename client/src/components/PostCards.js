import React, { useState, useEffect } from 'react';
import FilteredPostcards from './FilteredCards';
import YearBar from './bars/YearBar';
import List from './bars/List';
import LocationMap from './bars/LocationMap';
import PostcardDetail from './bars/PostcardDetail';
import Search from './bars/SearchBar';

import axios from 'axios';
require('dotenv').config();


const PostCards = ({ page, newPage, match }) => {
  // /////// STATE:
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState(null);

  // /////// CONSTANTS:

  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });

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

  const getSelectedCard = cardId => {
    return service
      .get(`/api/postcard/${cardId}`)
      .then(cards => {
        setSelectedCard(cards.data);
        console.log('gotCards', cards.data);
      })
      .catch(error => console.log(error));
  };

  // /////// COMPONENT UPDATE:

  useEffect(() => {
    newPage();
  }, []);

  useEffect(() => {
    let yearFromUrl = match && match.params.year;
    let regionFromUrl = match && match.params.region;
    let idFromUrl = match && match.params.id;
    console.log('MATCH PARAMS', yearFromUrl, regionFromUrl, idFromUrl);
  }, [match]);

  useEffect(() => {
    getCards(year, region);
  }, [year, region]);

  // /////// RENDER:

  const renderPage = () => {
    switch (page) {
      case 'Region':
        return <List region={region} setRegion={setRegionOnly} />;
      case 'Map':
        return <LocationMap page={page} cards={cards} />;
      case 'Years':
        return <YearBar page={page} year={year} setYear={setYearOnly} />;
      case 'CardDetail':
        return <PostcardDetail page={page} card={selectedCard} />;
      case 'Search':
        return <Search page={page} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderPage()}
      <FilteredPostcards cards={cards} page={page} setSelectedCard={setSelectedCard} />
    </div>
  );
};

export default PostCards;
