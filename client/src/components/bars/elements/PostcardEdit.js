import React, { Component, useState } from 'react';
import { /* Link, BrowserRouter, */ Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`
});

const PostcardDetail = ({ card, setCurrentCard }) => {
  const [file, setFile] = useState();

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e, key) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);
    console.log('uploadImage');
    const img = await service.post('/uploadimg', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const imgUrl = img.data.secure_url;
    console.log('imgUrl', key, imgUrl);
    const postcard = card;
    postcard[key] = imgUrl;
    const updatedCard = await service.post('/postcard', postcard);
    setCurrentCard(updatedCard);
    console.log('updatedCard', updatedCard);
  };

  if (card) {
    return (
      <div className="form-card box">
        <div className="file">
          <form onSubmit={e => uploadImage(e, 'imageFront')}>
            <label className="file-label">
              <input className="file-input" type="file" onChange={e => handleChange(e)} />
              <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
              <span className="file-cta">
                <span className="file-label">imageFront</span>
              </span>
            </label>
            <button className="button is-primary" type="submit">
            imageFront
            </button>
          </form>
          <form onSubmit={e => uploadImage(e, 'imageBack')}>
            <label className="file-label">
              <input className="file-input" type="file" onChange={e => handleChange(e)} />
              <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
              <span className="file-cta">
                <span className="file-label">imageBack</span>
              </span>
            </label>
            <button className="button is-primary" type="submit">
            imageBack
            </button>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

// {card.indicator}~{card.year}~{card.QTH}~{card.country}~{card.continent}

export default PostcardDetail;


/* <div class="field">
  <div class="file is-primary">
    <label class="file-label">
      <input class="file-input" type="file" name="resume">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Primary file…
        </span>
      </span>
    </label>
  </div>
</div> */