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
  router.get('/:year/:batch', (req, res, next) => {
    const { year, batch } = req.params;
    const batchSize = 45;
    const skip = (batch || 0) * batchSize;
    const y = Number(year);
    console.log('***************/:year/:batch', y, typeof y,batch, skip);
    Postcard.find({ year: y })
      /* .skip(skip)
      .limit(batchSize) */
      .then(obj => {
        console.log('/:year/:batch', obj);
        return res.status(200).json(obj);
      })
      .catch(e => {
        console.log(e)
        return next(e)});
  });

  router.get('/:year', (req, res, next) => {
    let { year } = req.params;

    year = parseInt(year);

    Postcard.find({ year })
      .then(obj => {
        console.log('^^^^^^^^^^^/:year', obj, typeof year);
        return res.status(200).json(obj);
      })
      .catch(e => next(e));
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = yearGet;
