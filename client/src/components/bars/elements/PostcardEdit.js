import React, { Component, useState } from 'react';
import { /* Link, BrowserRouter, */ Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const imageUrl = 'https://res.cloudinary.com/dmtbzrye8/image/upload/v1556896807/EA1EG/';
const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`
});

const PostcardDetail = ({ card, setCurrentCard }) => {
  
  const [file, setFile] = useState();


  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  async function uploadImage (e, key) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);

    const img = await service
      .post('/uploadCloud', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })   
    const imgUrl = img.data.secure_url;
    const postcard = card;
    postcard[key] = imgUrl;
    const updatedCard = await service.post('/postcard', postcard)
    setCurrentCard(updatedCard)
  };

  if (card) {
    return (
      <div className="form-card box">
        <div className="file">
          <form onSubmit={e => uploadImage(e, 'imageFront')}>
            <label className="file-label">
              <input className="file-input" type="file" onChange={e => handleChange(e)} />
              <span className="file-cta">
                <span className="file-label">imageFront</span>
              </span>
            </label>
            <button className="button is-primary" type="submit">
              Upload
            </button>
          </form>
          <form onSubmit={e => uploadImage(e, 'imageBack')}>
            <label className="file-label">
              <input className="file-input" type="file" onChange={e => handleChange(e)} />
              <span className="file-cta">
                <span className="file-label">imageBack</span>
              </span>
            </label>
            <button className="button is-primary" type="submit">
              Upload
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
