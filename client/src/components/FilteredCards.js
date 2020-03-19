import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import ThumbnailCard from './cards/ThumbnailCard';
require('dotenv').config();

let count = 0;

const FilteredCards = ({
  cards,
  page,
  setSelectedCard,
  getCards,
  initialized,
  limit,
  initialLoad,
  start = 0,
  children,
  cardId
}) => {
  const windowSize = useWindowSize();
  /* const style = {
    width: page === 'Years' ? `${windowSize.width - 100}px` : '100%'
  }; */
  useEffect(() => {
    if (!initialized && getCards) {
      getCards(0);
    }
  }, [getCards, start]);

  return (
    <section className={`page allcards${page === 'Years' ? ' year' : ''}`}>
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
            height={20}
            width={20}
            timeout={3000} //3 secs
          />
        }
      >
        {children}
        <div className="columns-wrapper">
          {cards &&
            cards.map((card, i) => (
              <Fragment>
                <ThumbnailCard
                  key={`${i}-${card._id}`}
                  card={card}
                  setSelectedCard={setSelectedCard}
                />
                {/* cardId && cardId === card._id && children */}
              </Fragment>
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default FilteredCards;
