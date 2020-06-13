import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const ThumbnailCard = ({ card, setSelectedCard }) => {
  const [image, setImage] = useState(card.imageFront);
  const [show, toggleShow] = useState(true);

  return (
    show && (
      <div className="column">
        <NavLink className="link postcard" to={`/card/${card._id}`}>
          <div className="postcard-thumbnail" onClick={() => setSelectedCard(card)}>
            <img
              src={image}
              alt={card.imageFront}
              onError={() => {
                setImage(`/img/placeHolder.png`);
                // toggleShow(false);
              }}
            />
          </div>
          <p className="postcard-data">
            <span className='bold'>{card.indicator}</span>~{card.year}~{card.QTH}~{card.country}~{card.continent}
          </p>
        </NavLink>
      </div>
    )
  );
};

export default ThumbnailCard;
