// import Postcard from "../models/Postcard";
// import { Router } from 'express';
const { Router } = require('express');
const router = Router();
//import { single } from '../config/cloudinary.js';
const { single } = require('../../config/cloudinary.js');
// import { parse } from 'papaparse';
const { parse } = require('papaparse');
// import CSV from './EA1EGdata';
const CSV = require('./EA1EGdata.js');

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
    imageFront: e[9],
    imageBack: e[10]
  };
  return obj;
});
console.log(data[5]);
console.log(dataObj[5]);

module.exports =  dataObj;

router.post('/api/postcard', single('tag-photo'), (req, res, next) => {});