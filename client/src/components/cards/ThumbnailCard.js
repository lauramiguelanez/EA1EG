import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';
require('dotenv').config();
// /////// CONSTANTS:
const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

const disable = (id) => service.patch(`/postcard/disable/${id}`)

const ThumbnailCard = ({ card, setSelectedCard, t }) => {
  const [show, toggleShow] = useState(true);
  const [loaded, toggleLoaded] = useState(false);
  const cleanName = (name) => name.toLowerCase().replace(' ', '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');

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
                disable(card._id)
              }}
              style={{ opacity: loaded ? 1 : 0}}
              onLoad={() => toggleLoaded(true)}
            />
          </div>
          {loaded && (<p className="postcard-data">
            <span className='bold'>{card.indicator}</span>~{card.year}~{card.QTH ? `${card.QTH}~` : ''}{t(cleanName(card.country))}~{t(cleanName(card.continent))}
          </p>)}
        </NavLink>
      </div>
    )
  );
};

export default ThumbnailCard;