const express = require('express');
const _ = require('lodash');

const randomGet = (Postcard, extensionFn) => {
  let router = express.Router();

  // Detect paths from model
  let notUsedPaths = ['_id', 'updated_at', 'created_at', '__v'];
  let paths = Object.keys(Postcard.schema.paths).filter(e => !notUsedPaths.includes(e));

  if (extensionFn) {
    router = extensionFn(router);
  }

  // GET RANDOM POSTCARDS
  router.get('/', (req, res, next) => {
    Postcard.aggregate([{ "$match": { "disabled":{ $ne: true } } }, { "$sample": { size: 12 } }])
      .then(objList => res.status(200).json(objList))
      .catch(e => next(e));
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = randomGet;
