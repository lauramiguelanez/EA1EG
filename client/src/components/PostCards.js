import React, { useState, useEffect } from 'react';
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
  let allCards = [];
  const [initialized, setInitialized] = useState(false);
  const [year, setYear] = useState(null);
  const [region, setRegion] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
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
    // 6437 / 45 = 144
    return service.get(route).then(cs => {
      // setBatch(batch + 1);
      const gotCards = cs.data;
      const moreCards = [...cards, ...gotCards];
      console.log('gotCards', moreCards);
      setCards(moreCards);
      setInitialized(true)
    });
  };

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
      .then(cs => {
        gotCards = cs.data;
        console.log('gotCards', gotCards);

        /* const storageObj = gotCards.map(({ location, indicator, _id }) => ({
          location,
          indicator,
          _id
        }));
        var dataStr =
          'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(storageObj));
          var downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href",     dataStr);
          downloadAnchorNode.setAttribute("download", 'location' + ".json");
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove(); */

        setCards(gotCards);
        if (route === '/postcard') {
          allCards = gotCards;
        }
      })
      .catch(error => console.log(error));
  };

  const getSearchCards = () => {
    service
      .get(`/search/${search}`)
      .then(cards => {
        const gotCards = cards.data;
        console.log('gotCards', gotCards);
        gotCards = utils.shuffle(gotCards);
        setCards(gotCards);
      })
      .catch(error => console.log(error));
  };

  const getSelectedCard = cardId => {
    service
      .get(`/api/postcard/${cardId}`)
      .then(cards => {
        setSelectedCard(cards.data);
        console.log('gotCards', cards.data);
      })
      .catch(error => console.log(error));
  };

  // /////// COMPONENT UPDATE:
  useEffect(() => {
    // getCards();

    newPage();
  }, []);

  useEffect(() => {
    let yearFromUrl = match && match.params.year;
    let regionFromUrl = match && match.params.region;
    let idFromUrl = match && match.params.id;
    console.log('MATCH PARAMS', yearFromUrl, regionFromUrl, idFromUrl);

    if (idFromUrl) {
      getSelectedCard(idFromUrl);
      newPage('CardDetail');
    }
    if (yearFromUrl) {
      setYear(yearFromUrl);
      newPage('Year');
    }
    if (regionFromUrl) {
      setRegion(regionFromUrl);
      newPage('Region');
    }
  }, [match]);

  useEffect(() => {
    // getSearchCards();

    if (search && search !== '') {
      const filteredCards = cards.filter(c => {
        const { continent, country, indicator, QTH, year } = c;

        const s = search.toUpperCase();

        return (
          s === continent || s === country || s === indicator || s === QTH || s === year.toString()
        );
      });

      // setCards(filteredCards);
    } else {
      // setCards(allCards);
    }
  }, [search]);

  useEffect(() => {
    // getCards(year, region);
    const filteredCards = cards.filter(c => {
      const regionUpper = region.toUpperCase();
      if (year && region) {
        const isRegion =
          c.country === regionUpper || c.continent === regionUpper || c.QTH === regionUpper;
        return c.year === year && isRegion;
      } else if (year && !region) {
        return year === c.year;
      } else if (!year && region) {
        const isRegion =
          c.country === regionUpper || c.continent === regionUpper || c.QTH === regionUpper;
        return isRegion;
      } else {
        return true;
      }
    });
    // setCards(filteredCards);
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
      <FilteredPostcards
        getCards={getCardsBatch}
        cards={cards}
        page={page}
        setSelectedCard={setSelectedCard}
        initialized={initialized}
      />
    </div>
  );
};

export default PostCards;
