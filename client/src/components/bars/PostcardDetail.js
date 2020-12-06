import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';
// import PostcardEdit from './elements/PostcardEdit';
import axios from 'axios';
require('dotenv').config();

const PostcardDetail = (props) => {
  const { card, cardId, setSelectedCard, height } = props;
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
  });

  const [display, setDisplay] = useState(true);
  const [currentCard, setCurrentCard] = useState(card);
  const [imageF, setImageF] = useState('/img/placeHolder.png');
  const [imageB, setImageB] = useState('/img/placeHolder.png');

  const close = () => {
    setDisplay(false);
    props.history.goBack();
  };

  const getSelectedCard = (cardId) => {
    service
      .get(`/postcard/${cardId}`)
      .then((card) => {
        setCurrentCard(card.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSelectedCard(cardId);
    setDisplay(true);
    animateScrollTo(height || 0);
    if (!card && cardId) {
      setCurrentCard(card);
      setSelectedCard(card);
    }
  }, [cardId]);

  useEffect(() => {
    const cloudinary = 'handmedown';
    const imageBaseUrl = (num) =>
      `https://res.cloudinary.com/${cloudinary}/image/upload/v1607268094/EA1EG/THUMB/${
        card.indicator
      }-${card.year ? card.year.toString().substring(2, 4) + '-' : ''}${num}.jpg`;
    if (card) {
      setImageF(imageBaseUrl(1));
      setImageB(imageBaseUrl(2));
    }
  }, [card && card._id]);

  if (currentCard && display) {
    const { QTH, year, continent, country, indicator, region } = currentCard;

    return (
      <section className="page detail">
        <div className="postcard-wrapper">
          <div className="postcard-img">
            <img
              src={imageF}
              alt={indicator}
              onError={() => {
                // setImageF(`/img/placeHolder.png`);
                setDisplay(false);
              }}
            />
          </div>
          <div className="postcard-img">
            <img
              src={imageB}
              alt={indicator}
              onError={() => {
                // setImageB(`/img/placeHolder.png`);
                setDisplay(false);
              }}
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
          {/* <PostcardEdit card={card} setCurrentCard={setCurrentCard} /> */}
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
