import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
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
        threshold={1250}
        loader={
          <Loader
            key={0}
            type="ThreeDots"
            color="#000"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
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
