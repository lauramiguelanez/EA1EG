const express = require('express');
const _ = require('lodash');

const searchGet = (Postcard, extensionFn) => {
  let router = express.Router();

  // Detect paths from model
  let notUsedPaths = ['_id', 'updated_at', 'created_at', '__v'];
  let paths = Object.keys(Postcard.schema.paths).filter(e => !notUsedPaths.includes(e));

  if (extensionFn) {
    router = extensionFn(router);
  }

  // SEARCH

  router.get('/:search/:batch', (req, res, next) => {
    const { search, batch } = req.params;
    const batchSize = 45;
    const skip = (batch || 0) * batchSize;
    Postcard.find({
      "$or": [
        { "country": new RegExp(search, 'gi') },
        { "continent": new RegExp(search, 'gi') },
        { "city": new RegExp(search, 'gi') },
        { "region": new RegExp(search, 'gi') },
        { "year": new RegExp(search, 'gi') },
        { "QTH": new RegExp(search, 'gi') },
        { "indicator": new RegExp(search, 'gi') },
        // { "imageFront": { "$search": new RegExp(search, 'gi') } }
      ]
    })
      .skip(skip)
      .limit(batchSize)
      .then(objList => res.status(200).json(objList))
      .catch(e => next(e));
  });

  router.get('/:search', (req, res, next) => {
    const { search } = req.params;
    Postcard.find({
      $or: [
        { country: new RegExp(search, 'gi') },
        { continent: new RegExp(search, 'gi') } /* , {city:region} */,
        { year: new RegExp(search, 'gi') },
        { QTH: new RegExp(search, 'gi') },
        { indicator: new RegExp(search, 'gi') },
        { imageFront: { $search: new RegExp(search, 'gi') } }
      ]
    })
      .then(objList => res.status(200).json(objList))
      .catch(e => next(e));
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = searchGet;
