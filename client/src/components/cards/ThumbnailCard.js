import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ThumbnailCard = ({ card, setSelectedCard }) => {
  const [show, toggleShow] = useState(true);
  const [loaded, toggleLoaded] = useState(false);

  return (
    show && (
      <div className="column">
        <NavLink className="link postcard" to={`/card/${card._id}`}>
          <div className="postcard-thumbnail" onClick={() => setSelectedCard(card)}>
            <img
              src={card.imageFront}
              alt={card.indicator}
              onError={() => {
                toggleShow(false);
              }}
              style={{ opacity: loaded ? 1 : 0}}
              onLoad={() => toggleLoaded(true)}
            />
          </div>
          {loaded && (<p className="postcard-data">
            <span className='bold'>{card.indicator}</span>~{card.year}~{card.QTH}~{card.country}~{card.continent}
          </p>)}
        </NavLink>
      </div>
    )
  );
};

export default ThumbnailCard;