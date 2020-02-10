import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import ThumbnailCard from './cards/ThumbnailCard';
require('dotenv').config();

const { window } = global;
const { innerWidth } = window;
let count = 0;

const FilteredCards = ({ cards, page, setSelectedCard, getCards, initialized }) => {
  const style = {
    width: page === 'Years' ? `${innerWidth - 100}px` : '100%'
  };
  useEffect(() => {
    if (!initialized) {
      getCards(0);
    }
  }, []);

  return (
    <section className="page" style={style}>
      <InfiniteScroll
        pageStart={count}
        loadMore={getCards}
        hasMore={6437 >= cards.length}
        threshold={100}
      >
        <div className="columns-wrapper">
          {cards &&
            cards.map((card, i) => (
              <ThumbnailCard key={card._id} card={card} setSelectedCard={setSelectedCard} />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default FilteredCards;
