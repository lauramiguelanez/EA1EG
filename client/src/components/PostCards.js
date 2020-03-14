import React, { useState, useEffect, Fragment } from 'react';
import FilteredPostcards from './FilteredCards';
import YearBar from './bars/YearBar';
import List from './bars/List';
import LocationMap from './bars/LocationMap';
import PostcardDetail from './bars/PostcardDetail';
import Search from './bars/elements/SearchBar';

import * as utils from '../utils/index';

import axios from 'axios';
require('dotenv').config();

const PostCards = ({ newPage, page, search, match }) => {
  // /////// STATE:

  const [initialized, setInitialized] = useState(false);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  // const [getFunction, setGetFunction] = useState(null);
  const [cards, setCards] = useState([]);

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
  const getCardsBatch = batch => {
    const route = '/postcard/page/' + batch;
    return service.get(route).then(cs => {
      // setBatch(batch + 1);
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      console.log('gotCards', moreCards);
      setCards(moreCards);
      setInitialized(true);
    });
  };

  const getRandom = () => {
    const route = '/search/random';
    return service.get(route).then(cs => {
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      console.log('gotRandomCards', moreCards);
      setCards(moreCards);
      setInitialized(true);
    });
  };

  const getCards = batch => {
    let gotCards;
    let route;
    if (year && !region) {
      route = `/year/${year}/${batch || 0}`;
    } else if (region && !year) {
      route = `/region/${region}/${batch || 0}`;
    }

    if (year || region) {
      return service
        .get(route)
        .then(cs => {
          gotCards = cs.data;
          setInitialized(true);
          if (batch === 0) {
            setCards(gotCards);
            console.log('gotCards', route, year, region, gotCards);
          } else {
            const moreCards = [...cards, ...gotCards];
            setCards(moreCards);
            console.log('gotCards', route, year, region, moreCards);
          }
        })
        .catch(error => console.log(error));
    }
  };

  const getSearchCards = () => {
    service
      .get(`/search/${search}`)
      .then(cards => {
        setInitialized(true);
        const gotCards = cards.data;
        console.log('gotCards', gotCards);
        gotCards = utils.shuffle(gotCards);
        setCards(gotCards);
      })
      .catch(error => console.log(error));
  };

  const getSelectedCard = cardId => {
    service
      .get(`/postcard/${cardId}`)
      .then(cards => {
        setSelectedCard(cards.data);
        console.log('gotCards', cards.data);
        setInitialized(true);
      })
      .catch(error => console.log(error));
  };

  // /////// COMPONENT UPDATE:
  useEffect(() => {
    newPage();
    setInitialized(false);
  }, []);

  useEffect(() => {
    let yearFromUrl = match && match.params.year;
    let regionFromUrl = match && match.params.region;
    let idFromUrl = match && match.params.id;
    console.log('MATCH PARAMS', yearFromUrl, regionFromUrl, idFromUrl);

    if (idFromUrl) {
      getSelectedCard(idFromUrl);
      setYear(null);
      setRegion(null);
      setCardId(idFromUrl);
      newPage('CardDetail');
    }
    if (yearFromUrl) {
      setYear(yearFromUrl);
      newPage('Year');
      setRegion(null);
      setCardId(null);
    }
    if (regionFromUrl) {
      setRegion(regionFromUrl);
      newPage('Region');
      setYear(null);
      setCardId(null);
    }
  }, [match]);

  useEffect(() => {
    setInitialized(false);
    if (year || region) {
    } else if (search && search !== '') {
      setInitialized(false);
    } else {
    }
  }, [year, region, search]);

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

  const renderPostcards = () => {
    switch (page) {
      case 'Region':
      case 'Map':
      case 'Years':
        return (
          <FilteredPostcards
            initialLoad={initialized}
            start={0}
            getCards={getCards}
            cards={cards}
            page={page}
            setSelectedCard={setSelectedCard}
            initialized={initialized}
            limit={cards.length <= 45}
          />
        );

      case 'Search':
        return (
          <FilteredPostcards
            initialLoad={initialized}
            start={0}
            getCards={getSearchCards}
            cards={cards}
            page={page}
            setSelectedCard={setSelectedCard}
            initialized={initialized}
            limit={cards.length <= 45}
          />
        );
      case 'CardDetail':
      default:
        return (
          <FilteredPostcards
            initialLoad={initialized}
            getCards={getCardsBatch}
            cards={cards}
            page={page}
            setSelectedCard={setSelectedCard}
            initialized={initialized}
            limit={6437 >= cards.length}
          />
        );
    }
  };

  console.log('getFunction', initialized, search);

  return (
    <Fragment>
      {renderPage()}
      {renderPostcards()}
    </Fragment>
  );
};

export default PostCards;
