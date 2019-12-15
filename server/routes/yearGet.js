const express = require('express');
const _ = require('lodash');

const yearGet = (Postcard, extensionFn) => {
  let router = express.Router();

  // Detect paths from model
  let notUsedPaths = ['_id', 'updated_at', 'created_at', '__v'];
  let paths = Object.keys(Postcard.schema.paths).filter(e => !notUsedPaths.includes(e));

  if (extensionFn) {
    router = extensionFn(router);
  }
  // CRUD: RETRIEVE

  router.get('/:year', (req, res, next) => {
    const { year } = req.params;
    Postcard.find({year})
      .then(obj => res.status(200).json(obj))
      .catch(e => next(e));
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = yearGet;
