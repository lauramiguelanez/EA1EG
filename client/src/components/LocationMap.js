import React, { useState } from 'react';
import axios from 'axios';
import GoogleMap from './maps/GoogleMap/index.js';
import markersData from './data/markersData.json';

import FilteredPostcards from './FilteredCards';
import PostcardDetail from './bars/PostcardDetail';

const LocationMap = props => {
  const [initialized, setInitialized] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);


  // /////// CONSTANTS:
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });

  const getSelectedCard = cardId => {

    service
      .get(`/postcard/${cardId}`)
      .then(card => {
        setInitialized(true);
        // setCurrentCard(card.data);
        // console.log('DetailCard', card.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <section>
      <GoogleMap locations={markersData} setCardId={props.setCardId}></GoogleMap>
      <FilteredPostcards
        initialLoad={initialized}
        getCards={getSelectedCard}
        cards={cards}
        setSelectedCard={setSelectedCard}
        initialized={initialized}
        limit={false}
        cardId={cardId}
      >
        {cardId && (
          <PostcardDetail
            setSelectedCard={setSelectedCard}
            card={selectedCard}
            cardId={cardId}
          />
        )}
      </FilteredPostcards>
    </section>
  );
};

export default LocationMap;
