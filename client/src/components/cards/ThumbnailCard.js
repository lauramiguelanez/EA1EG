import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const imageUrl = ''; //'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

const ThumbnailCard = ({ card, setSelectedCard }) => {
  const [image, setImage] = useState(card.imageFront);

  return (
    <div className="column">
      <NavLink className="link postcard" to={`/card/${card._id}`}>
        <div>
          <div className="postcard-thumbnail" onClick={() => setSelectedCard(card)}>
            <img
              src={image}
              alt={card.indicator}
              onError={() =>
                setImage(`/img/placeHolder.png`)
              }
            />
          </div>
          <p className="postcard-data">
            {card.indicator}~{card.year}~{card.QTH}~{card.country}~{card.continent}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default ThumbnailCard;
