import React, { useState, useEffect, Fragment } from 'react';
import animateScrollTo from 'animated-scroll-to';

import FilteredPostcards from './FilteredCards';
import YearBar from './bars/YearBar';
import List from './bars/List';
import LocationMap from './bars/LocationMap';
import PostcardDetail from './bars/PostcardDetail';

import axios from 'axios';
require('dotenv').config();

const PostCards = ({ newPage, page, match }) => {
  // /////// STATE:
  const yearFromUrl = match && match.params.year;
  const regionFromUrl = match && match.params.region;
  const seachFromUrl = match && match.params.search;
  const idFromUrl = match && match.params.id;

  const [initialized, setInitialized] = useState(false);
  const [limit, setLimit] = useState(true);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [search, setSearch] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  // /////// CONSTANTS:
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });

  // /////// SET STATE:

  const setYearOnly = y => {
    setRegion(null);
    setYear(y);
    setSearch(null);
  };

  const setRegionOnly = r => {
    setRegion(r);
    setYear(null);
    setSearch(null);
  };

  // /////// GET DATA:
  const getCardsBatch = batch => {
    const route = '/postcard/page/' + batch;
    return service.get(route).then(cs => {
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      // console.log('gotCards', moreCards);
      setCards(moreCards);
      setInitialized(true);
    });
  };

  const getRandom = () => {
    const route = '/random';
    return service.get(route).then(cs => {
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      // console.log('gotRandomCards', moreCards);
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
          if (batch <= 0) {
            setCards(gotCards);
          } else {
            const moreCards = [...cards, ...gotCards];
            setCards(moreCards);
          }
          if (gotCards.length <= 0) {
            setLimit(false);
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
        console.log('SEARCH gotCards', gotCards);
        setCards(gotCards);
      })
      .catch(error => console.log(error));
  };

  const getSearchCardsBatch = batch => {
    service
      .get(`/search/${search}/${batch}`)
      .then(cs => {
        const gotCards = cs.data;
        setInitialized(true);
        if (batch <= 0) {
          setCards(gotCards);
        } else {
          const moreCards = [...cards, ...gotCards];
          setCards(moreCards);
        }
        if (gotCards.length <= 0) {
          setLimit(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getSelectedCard = cardId => {
    service
      .get(`/postcard/${cardId}`)
      .then(card => {
        setSelectedCard(card.data);
        // console.log('SELECTEDgotCards', cards.data);
        setInitialized(true);
      })
      .catch(error => console.log(error));
  };

  // /////// COMPONENT UPDATE:
  useEffect(() => {
    newPage();
    setInitialized(false);
    animateScrollTo(0);
  }, []);

  useEffect(() => {
    // console.log('MATCH PARAMS', yearFromUrl, regionFromUrl, idFromUrl);
    animateScrollTo(0);
    if (idFromUrl) {
      getSelectedCard(idFromUrl);
      setCardId(idFromUrl);
      newPage('CardDetail');
      // setYear(null);
      // setRegion(null);
      // setSearch(null);
    }
    if (yearFromUrl) {
      setYear(yearFromUrl);
      newPage('Year');
      setRegion(null);
      setCardId(null);
      setSearch(null);
    }
    if (regionFromUrl) {
      setRegion(regionFromUrl);
      newPage('Region');
      setYear(null);
      setCardId(null);
      setSearch(null);
    }
    if (seachFromUrl) {
      setSearch(seachFromUrl);
      newPage('Search');
      setYear(null);
      setRegion(null);
      setCardId(null);
    }
  }, [yearFromUrl, regionFromUrl, idFromUrl, seachFromUrl]);

  useEffect(() => {
    animateScrollTo(0);
    setInitialized(false);
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
        return <PostcardDetail page={page} card={selectedCard} cardId={cardId} />;
      case 'Search':
        return null; // <Search page={page} />;
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
            limit={limit}
          />
        );
      case 'Search':
        return (
          <FilteredPostcards
            initialLoad={initialized}
            start={0}
            getCards={getSearchCardsBatch /* getSearchCards */}
            cards={cards}
            page={page}
            setSelectedCard={setSelectedCard}
            initialized={initialized}
            limit={limit /* cards.length > 45 */}
          />
        );
      case 'CardDetail':
      default:
        return (
          <FilteredPostcards
            initialLoad={initialized}
            getCards={getRandom /* getCardsBatch */}
            cards={cards}
            page={page}
            setSelectedCard={setSelectedCard}
            initialized={initialized}
            limit={16437 >= cards.length}
          />
        );
    }
  };

  return (
    <Fragment>
      {renderPage()}
      {renderPostcards()}
    </Fragment>
  );
};

export default PostCards;
