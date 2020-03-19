import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';

import PostcardEdit from './elements/PostcardEdit';
import axios from 'axios';
require('dotenv').config();

const PostcardDetail = props => {
  const { card, cardId, setSelectedCard } = props;
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
    props.history.goBack();
    // return props.history.push(url);
  };

  const getSelectedCard = cardId => {
    service
      .get(`/postcard/${cardId}`)
      .then(card => {
        setCurrentCard(card.data);
        // console.log('DetailCard', card.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getSelectedCard(cardId);
    setDisplay(true);
    animateScrollTo(0);
    if (!card && cardId) {
      setCurrentCard(card);
      setSelectedCard(card);
    }
  }, [cardId]);

  useEffect(() => {
    if (card) {
      setImageF(card.imageFront);
      setImageB(card.imageBack);
    }
  }, [card && card._id]);

  if (currentCard && display) {
    const { QTH, year, continent, country, indicator, region } = currentCard;

    console.log('currentCard', currentCard);

    return (
      <section className="page detail">
        <div className="postcard-wrapper">
          <div className="postcard-img">
            <img src={imageF} alt={indicator} onError={() => setImageF(`/img/placeHolder.png`)} />
          </div>
          <div className="postcard-img">
            <img src={imageB} alt={indicator} onError={() => setImageB(`/img/placeHolder.png`)} />
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
          <div className="closeIcon1">
            <div className="closeIcon2"></div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default withRouter(PostcardDetail);
