import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ThumbnailCard from './cards/ThumbnailCard';
require('dotenv').config();

const FilteredCards = ({
  cards,
  page,
  setSelectedCard,
  getCards,
  initialized,
  limit,
  // initialLoad,
  start = 0,
  children,
  //cardId,
  t,
}) => {
  /* useEffect(() => {
    if (!initialized && getCards) {
      getCards(0);
    }
  }, [getCards, start]); */

  return (
    <section className={`page allcards${page === 'Years' ? ' year' : ''}`}>
      <InfiniteScroll
        initialLoad={!initialized}
        pageStart={start}
        loadMore={getCards}
        hasMore={limit}
        threshold={100}
        /*loader={
          <div className="rotate top"/>
        }*/
      >
        {children}
        <div className="columns-wrapper">
          {cards &&
            cards.map((card, i) => (
                <ThumbnailCard
                  key={`${i}-${card._id}`}
                  card={card}
                  setSelectedCard={setSelectedCard}
                  t={t}
                />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default FilteredCards;
