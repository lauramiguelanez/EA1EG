// import Postcard from "../models/Postcard";
// import { Router } from 'express';
const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { single } = require('../../config/cloudinary.js');
const { parse } = require('papaparse');
const CSV = require('./EA1EGdata.js');
const cloudinary = require("cloudinary");

const postcardUpload = (filePath, axiosOptions = {}) => {
  // const simplePath = filePath.replace(filePath.substring(filePath.length - 6, filePath.length - 5), "00");
  // const file = require(`../../public/TARJETAS_EA1EG/${simplePath}`);
  // return simplePath;

  const apiUrl ='http://localhost:3010';
  const url = `${apiUrl}/uploadimg`;
  /* return axios.post(url, file, {
    headers: {},
    'content-type': 'multipart/form-data',
    ...axiosOptions,
  }); */
  cloudinary.v2.uploader.upload(`${filePath}`/* `../../public/TARJETAS_EA1EG/${filePath}` */, 
    function(error, result) {console.log('CLOUDINARY', result, error)});
};


let config = {
  delimiter: '', // auto-detect
  newline: '', // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: false,
  trimHeaders: false,
  dynamicTyping: false,
  preview: 0,
  encoding: '',
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  skipEmptyLines: false,
  chunk: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  transform: undefined
};

let result = parse(CSV, config);
let data = result.data;
data.forEach(e => {
  e.splice(9, 5);
});
let dataObj = data.map(e => {
  let obj = {
    continent: e[0],
    country: e[1],
    region: e[2] + ' ' + e[3],
    indicator: e[4],
    QTH: e[5],
    year: '19' + e[6],
    coordinates: [e[7], e[8]],
    location:{lat: e[7], lng:e[8]},
    imageFront: e[9],
    imageBack: e[10],
    urlFront: `https://res.cloudinary.com/dmtbzrye8/image/upload/v1556733401/EA1EG/${e[4]}-${e[6]}-${1}.jpg`,
    urlBack: `https://res.cloudinary.com/dmtbzrye8/image/upload/v1556733401/EA1EG/${e[4]}-${e[6]}-${2}.jpg`,
    /* imageFront: postcardUpload(e[9]),
    imageBack: postcardUpload(e[10]), */
  };
  return obj;
});
console.log(data[2]);
console.log(dataObj[2]);

// console.log('FILE UPLOAD', postcardUpload(dataObj[2].imageFront));

module.exports = dataObj;
