import React, { useState, useEffect } from 'react';
import animateScrollTo from 'animated-scroll-to';

import FilteredPostcards from './FilteredCards';
import YearBar from './bars/YearBar';
import List from './bars/List';
import PostcardDetail from './bars/PostcardDetail';

import axios from 'axios';
require('dotenv').config();

// /////// CONSTANTS:
const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

const PostCards = ({ newPage, page, match, t }) => {
  // /////// STATE:
  const yearFromUrl = match && match.params.year;
  const regionFromUrl = match && match.params.region;
  const seachFromUrl = match && match.params.search;
  const idFromUrl = match && match.params.id;

  const [initialized, setInitialized] = useState(true);
  const [limit, setLimit] = useState(true);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(regionFromUrl || null);
  const [search, setSearch] = useState(seachFromUrl || null);
  const [cardId, setCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  // /////// SET STATE:
  const setYearOnly = (y) => {
    setRegion(null);
    setYear(y);
    setSearch(null);
  };

  const setRegionOnly = (r) => {
    setRegion(r);
    setYear(null);
    setSearch(null);
  };

  // /////// GET DATA:
  const getRandom = () => {
    const route = '/random';
    console.log('getRandom', route)
    return service.get(route).then((cs) => {
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      setCards(moreCards);
      setInitialized(true);
    });
  };

  const getCards = (batch) => {
    let gotCards;
    let route;
    if (year && !region) {
      route = `/year/${year}/${batch || 0}`;
    } else if (region && !year) {
      route = `/region/${region}/${batch || 0}`;
    } else if (search) {
      route = `/search/${search}/${batch || 0}`;
    }

    console.log('getCards', year, route)

    if (year || region || search) {
      return service
        .get(route)
        .then((cs) => {
          gotCards = cs.data;
          setInitialized(true);
          if (batch <= 0) {
            setCards(gotCards);
          } else {
            const moreCards = [...cards, ...gotCards];
            setCards(moreCards);
          }
          if (gotCards.length === 0 && batch > 3) {
            setLimit(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const getSelectedCard = (cardId) => {
    service
      .get(`/postcard/${cardId}`)
      .then((card) => {
        setSelectedCard(card.data);
        setInitialized(true);
      })
      .catch((error) => console.log(error));
  };

  // /////// COMPONENT UPDATE:
  useEffect(() => {
    newPage();
    setInitialized(false);
    animateScrollTo(0);
  }, []);

  useEffect(() => {
    if (selectedCard) {
      setCardId(selectedCard._id);
    }
  }, [selectedCard]);

  useEffect(() => {
    animateScrollTo(0);
    if (idFromUrl) {
      getSelectedCard(idFromUrl);
      setCardId(idFromUrl);
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
    console.log('effect')
  }, [year, region, search]);

  // /////// RENDER:

  const renderPage = () => {
    switch (page) {
      case 'Region':
        return <List region={region} setRegion={setRegionOnly} />;
      case 'Years':
        return <YearBar page={page} year={year} setYear={setYearOnly} />;
      default:
        return null;
    }
  };

  const getCurrentFn = () => {
    switch (page) {
      case 'Region':
      case 'Years':
        return { currLimit: limit, currFn: !!year || !!region ? getCards : getRandom };
      case 'Search':
        return { currLimit: limit, currFn: getCards /* getSearchCards */ };
      default:
        return { currLimit: 16437 >= cards.length, currFn: getRandom };
    }
  };

  const { currLimit, currFn } = getCurrentFn();

  return (
    <>
      {renderPage()}
      <FilteredPostcards
        initialLoad={initialized}
        getCards={currFn}
        cards={cards}
        page={page}
        setSelectedCard={setSelectedCard}
        initialized={initialized}
        limit={currLimit}
        cardId={cardId}
        t={t}
      >
        {cardId && (
          <PostcardDetail
            key={cardId}
            page={page}
            setSelectedCard={setSelectedCard}
            card={selectedCard}
            cardId={cardId}
            t={t}
          />
        )}
      </FilteredPostcards>
    </>
  );
};

export default PostCards;
