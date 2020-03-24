import React, { useState, useEffect, Fragment } from 'react';
import animateScrollTo from 'animated-scroll-to';

import FilteredPostcards from './FilteredCards';
import YearBar from './bars/YearBar';
import List from './bars/List';
import LocationMap from './LocationMap';
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
  const [region, setRegion] = useState('null');
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

    /* service
      .get('/postcard')
      .then(cs => {
        function downloadObjectAsJson(exportObj, exportName) {
          var dataStr =
            'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
          var downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute('href', dataStr);
          downloadAnchorNode.setAttribute('download', exportName + '.json');
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        }
        const markers = cs.data.map(({ _id, location, indicator }) => ({
          id: _id,
          lat: location ? location.lat : null,
          lng: location ? location.lng : null,
          indicator
        }));
        downloadObjectAsJson(markers, 'markersData');
        console.log('------------ALL', cs.data, markers);
      })
      .catch(error => console.log(error)); */
  }, []);

  useEffect(() => {
    if (selectedCard) {
      setCardId(selectedCard._id);
    }
  }, [selectedCard]);

  useEffect(() => {
    // console.log('MATCH PARAMS', yearFromUrl, regionFromUrl, idFromUrl);
    animateScrollTo(0);
    if (idFromUrl) {
      getSelectedCard(idFromUrl);
      setCardId(idFromUrl);
      // newPage('CardDetail');
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
        return { currLimit: limit, currFn: getSearchCardsBatch /* getSearchCards */ };
      default:
        return { currLimit: 16437 >= cards.length, currFn: getRandom /* getCardsBatch */ };
    }
  };

  const { currLimit, currFn } = getCurrentFn();

  return (
    <Fragment>
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
      >
        {cardId && (
          <PostcardDetail
            page={page}
            setSelectedCard={setSelectedCard}
            card={selectedCard}
            cardId={cardId}
          />
        )}
      </FilteredPostcards>
    </Fragment>
  );
};

export default PostCards;
