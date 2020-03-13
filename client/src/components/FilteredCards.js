import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import ThumbnailCard from './cards/ThumbnailCard';
require('dotenv').config();

const { window } = global;
const { innerWidth } = window;
let count = 0;

const FilteredCards = ({
  cards,
  page,
  setSelectedCard,
  getCards,
  initialized,
  limit,
  initialLoad,
  start = 0
}) => {
  const style = {
    width: page === 'Years' ? `${innerWidth - 100}px` : '100%'
  };
  useEffect(() => {
    if (!initialized && getCards) {
      getCards(0);
    }
  }, [getCards, start]);

  return (
    <section className="page allcards" style={style}>
      <InfiniteScroll
        initialLoad={true}
        pageStart={start}
        loadMore={getCards}
        hasMore={limit}
        threshold={250}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <div className="columns-wrapper">
          {cards &&
            cards.map((card, i) => (
              <ThumbnailCard
                key={`${i}-${card._id}`}
                card={card}
                setSelectedCard={setSelectedCard}
              />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default FilteredCards;
