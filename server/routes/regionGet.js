const express = require('express');
const _ = require('lodash');

const regionGet = (Postcard, extensionFn) => {
  let router = express.Router();

  // Detect paths from model
  let notUsedPaths = ['_id', 'updated_at', 'created_at', '__v'];
  let paths = Object.keys(Postcard.schema.paths).filter(e => !notUsedPaths.includes(e));

  if (extensionFn) {
    router = extensionFn(router);
  }

  // CRUD: RETRIEVE
  router.get('/:region/:batch', (req, res, next) => {
    const batchSize = 10;
    const { batch, region } = req.params;
    const skip = (batch || 0) * batchSize;
    const r = region.toUpperCase();
    Postcard.find({
      $or: [{ country: r }, { continent: r }, { city: r }, { region: r }, { QTH: r }]
    })
      .skip(skip)
      .limit(batchSize)
      .then(obj => res.status(200).json(obj))
      .catch(e => next(e));
  });

 /*  router.get('/:region', (req, res, next) => {
    const { region } = req.params.toUpperCase();
    // { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    Postcard.find({ $or: [{ country: region }, { continent: region } ]})
      .then(obj => res.status(200).json(obj))
      .catch(e => next(e));
  }); */

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = regionGet;
