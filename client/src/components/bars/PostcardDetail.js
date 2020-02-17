import React, { Component, useState } from 'react';
import { /* Link, BrowserRouter, */ Redirect, NavLink } from 'react-router-dom';

import PostcardEdit from './elements/PostcardEdit';

const PostcardDetail = ({ card }) => {
  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

  const [display, setDisplay] = useState(true);
  const [currentCard, setCurrentCard] = useState(card);

  const close = () => {
    setDisplay(false);
    let url = `/card/s`;
    return <Redirect to={url} />;
  };

  if (card && display) {
    const {
      QTH,
      location,
      year,
      imageFront,
      imageBack,
      continent,
      country,
      indicator,
      city,
      region
    } = currentCard;

    return (
      <section className="page detail">
        <div className="postcard-wrapper">
          <div className="postcard-img">
            <img src={`${imageUrl}${imageFront}`} alt={indicator} />
          </div>
          <div className="postcard-img">
            <img src={`${imageUrl}${imageBack}`} alt={indicator} />
          </div>
        </div>
        <div className="postcard-detail-data">
          <div className="data-group">
            <p>{indicator}</p>
            <p>{year}</p>
          </div>
          <div className="data-group">
            <p>{`${QTH}, ${region}`}</p>
            <p>{`${country}, ${continent}`}</p>
          </div>
          <PostcardEdit card={card} setCurrentCard={setCurrentCard} />
        </div>

        <div className="close-detail" onClick={close} id="closeIcon">
          <div class="closeIcon1">
            <div class="closeIcon2"></div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

// {card.indicator}~{card.year}~{card.QTH}~{card.country}~{card.continent}

export default PostcardDetail;
