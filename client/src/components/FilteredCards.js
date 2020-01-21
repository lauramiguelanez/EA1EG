import React, { Component } from 'react';
import { /* Link, BrowserRouter, */ NavLink } from 'react-router-dom';
import axios from 'axios';
import YearBar from './bars/YearBar';
import List from './bars/List';

const { window } = global;
const { innerWidth, innerHeight } = window;

require('dotenv').config();

const FilteredCards = ({ cards, page }) => {
  const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';

  const style = {
    width: page === 'Years' ? `${innerWidth - 100}px` : '100vw'
  };

  return (
    <section className="page page-years" style={style}>
      <div className="columns-wrapper ">
        {cards
          ? cards.map((card, i) => {
              return (
                <div className="column">
                  <NavLink key={card._id} className="nav-link postcard" to={`/card/${card._id}`}>
                    <div className="postcard-thumbnail">
                      {card.imageFront ? (
                        <img src={`${imageUrl}${card.imageFront}`} alt={card.indicator} />
                      ) : (
                        <h3 className="postcard-thumbnail card-thumbnail-name">{card.indicator}</h3>
                      )}
                    </div>
                  </NavLink>
                </div>
              );
            })
          : new Array(13).fill(0).map((e, i) => {
              return (
                <div className="column">
                  <NavLink key={i} className="nav-link postcard" to="/postal/:id">
                    <div className="postcard-thumbnail" />
                  </NavLink>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default FilteredCards;
