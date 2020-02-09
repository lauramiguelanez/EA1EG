import React from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';

const { window } = global;
const { innerWidth } = window;

require('dotenv').config();

const FilteredCards = ({ cards, page, setSelectedCard }) => {
  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

  const style = {
    width: page === 'Years' ? `${innerWidth - 100}px` : '100%'
  };

  return (
    <section className="page" style={style}>
      <div className="columns-wrapper ">
        {cards
          ? cards.map((card, i) => {
              return (
                <div className="column">
                  <div>
                    <NavLink key={card._id} className="nav-link postcard" to={`/card/${card._id}`}>
                      <button className="postcard-thumbnail" onClick={() => setSelectedCard(card)}>
                        {card.imageFront ? (
                          <img src={`${imageUrl}${card.imageFront}`} alt={card.indicator} />
                        ) : (
                          <h3 className="postcard-thumbnail">{card.indicator}</h3>
                        )}
                      </button>
                    </NavLink>
                    <p className="postcard-data">
                      {card.indicator}-{card.year}-{card.QTH}-{card.country}-{card.continent}
                    </p>
                  </div>
                </div>
              );
            })
          : new Array(1).fill(0).map((e, i) => {
              return (
                <div className="column">
                  <NavLink key={i} className="nav-link postcard" to="/postal/:id">
                    <div className="postcard-thumbnail" />
                  </NavLink>
                </div>
              );
            })}
      </div>
    </section>
  );
};
// EAQEG~1953~Madrid~Madrid~España~Europa
/* 
_id: "5dd94c5991cd6e535821250d"
continent: "AMERICA"
country: "USA"
indicator: "W1IKI"
QTH: "MASSACHUSETTS"
year: "1960"
imageFront: "AMERICA/USA/W1IKI-1.jpg"
imageBack: "AMERICA/USA/W1IKI-2.jpg"
created_at: "2019-11-23T15:12:26.467Z"
updated_at: "2019-11-23T15:12:26.467Z"
*/

export default FilteredCards;
