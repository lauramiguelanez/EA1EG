import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ThumbnailCard = ({ card, setSelectedCard }) => {
  const [image, setImage] = useState(card.imageFront);
  const [show, toggleShow] = useState(true);
  const [loaded, toggleLoaded] = useState(false);

  return (
    show && (
      <div className="column">
        <NavLink className="link postcard" to={`/card/${card._id}`}>
          <div className="postcard-thumbnail" onClick={() => setSelectedCard(card)}>
            <img
              src={image}
              alt={card.imageFront}
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

// https://res-console.cloudinary.com/dmtbzrye8/thumbnails/v1/image/upload/v1581333516/RUExRUcvQU1FUklDQS9CQUhBTUFTL1ZQN05NLTU3LTE=/list/
// https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/EUROPA/ITALIA/I1WS-60-2.jpg