import React, { Component, useState, useEffect } from 'react';
import { /* Link, BrowserRouter, */ Redirect, NavLink } from 'react-router-dom';

import PostcardEdit from './elements/PostcardEdit';
import axios from 'axios';
require('dotenv').config();

const PostcardDetail = ({ card, cardId }) => {
  const imageUrl = '';
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`
  });

  const [display, setDisplay] = useState(true);
  const [currentCard, setCurrentCard] = useState(card);
  const [imageF, setImageF] = useState('/img/placeHolder.png');
  const [imageB, setImageB] = useState('/img/placeHolder.png');

  const close = () => {
    setDisplay(false);
    let url = `/cards`;
    return <Redirect to={url} />;
  };

  const getSelectedCard = cardId => {
    service
      .get(`/postcard/${cardId}`)
      .then(cards => {
        setCurrentCard(cards.data);
        console.log('gotCards', cards.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getSelectedCard(cardId);
  }, [cardId]);

  useEffect(() => {
    if (!card && cardId) {
      setCurrentCard(card);
      setImageF(card.imageFront);
      setImageB(card.imageBack);
    }
  }, [cardId]);

  if (currentCard && display) {
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
            <img
              src={`${imageUrl}${imageF}`}
              alt={indicator}
              onError={() => setImageF(`/img/placeHolder.png`)}
            />
          </div>
          <div className="postcard-img">
            <img
              src={`${imageUrl}${imageB}`}
              alt={indicator}
              onError={() => setImageB(`/img/placeHolder.png`)}
            />
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
