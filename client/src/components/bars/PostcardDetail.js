import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
const PostcardDetail = ({ card }) => {
  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

  const close = () => {
    //
  };

  if (card) {
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
    } = card;
    return (
      <section className="page detail">
        <div className="postcard-wrapper">
          <div className="postcard-img">
            <img src={`${imageUrl}${card.imageFront}`} alt={card.indicator} />
          </div>
          <div className="postcard-img">
            <img src={`${imageUrl}${card.imageBack}`} alt={card.indicator} />
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
        </div>
        <button className="close-detail" onClick={close}>
          close
        </button>
      </section>
    );
  }
  return null;
};

// {card.indicator}~{card.year}~{card.QTH}~{card.country}~{card.continent}

export default PostcardDetail;
