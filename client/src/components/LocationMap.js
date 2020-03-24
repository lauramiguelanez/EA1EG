import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './maps/GoogleMap/index.js';
import markersData from './data/markersData.json';

import FilteredPostcards from './FilteredCards';
import PostcardDetail from './bars/PostcardDetail';

const LocationMap = props => {
  const [initialized, setInitialized] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardIds, setCardIds] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // /////// CONSTANTS:
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });

  const getCards = () => {
    service
      .post('/postcard/many', { ids: cardIds })
      .then(cards => {
        setInitialized(true);
        setCards(cards.data);
        // setCurrentCard(card.data);
        console.log('cards', cards.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getCards();
  }, [cardIds]);

  return (
    <section>
      <GoogleMap locations={markersData} setCardId={setCardId} setCardIds={setCardIds}></GoogleMap>
      <FilteredPostcards
        initialLoad={initialized}
        getCards={getCards}
        cards={cards}
        setSelectedCard={setSelectedCard}
        initialized={initialized}
        limit={false}
        cardId={cardId}
      >
        {cardId && (
          <PostcardDetail setSelectedCard={setSelectedCard} card={selectedCard} cardId={cardId} />
        )}
      </FilteredPostcards>
    </section>
  );
};

export default LocationMap;
