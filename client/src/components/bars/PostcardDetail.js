import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
const PostcardDetail = ({ card }) => {

  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';
  if (card) {
    const { QTH, location, year, imageFront, imageBack, continent, country } = card;
    return (
      <section className="page page-years">
        <div className="postcard-data">
          <p>{QTH}</p>
          <p>{`${country}, ${continent}`}</p>
          <p>{year}</p>
        </div>
        <div className="postcard-wrapper">
          <div className="postcard-img" style={{ imageBackground: `url(${imageUrl + imageFront})` }} />
          <div className="postcard-img" style={{ imageBackground: `url(${imageUrl + imageBack})` }} />
        </div>
      </section>
    );
  }
  return null;
};

export default PostcardDetail;
