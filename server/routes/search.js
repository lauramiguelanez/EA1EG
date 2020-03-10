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
  router.get('/:search', (req, res, next) => {
    const { search } = req.params;
    Postcard.find({
      $or: [
        { country: search },
        { continent: search } /* , {city:region} */,
        { year: search },
        { QTH: search },
        { indicator: search },
        { imageFront: { $search: search } }
      ]
    })
      .then(objList => res.status(200).json(objList))
      .catch(e => next(e));
  });

  router.get('/random/:search', (req, res, next) => {
    const { search } = req.params;
    if (search && search !== '') {
      Postcard.aggregate([
        { $sample: { size: 45 } },
        {
          $match: {
            $or: [
              { country: search },
              { continent: search } /* , {city:region} */,
              { year: search },
              { QTH: search },
              { indicator: search }
            ]
          }
        }
      ])
        .then(objList => res.status(200).json(objList))
        .catch(e => next(e));
    } else {
      Postcard.aggregate([{ $sample: { size: 45 } }])
        .then(objList => res.status(200).json(objList))
        .catch(e => next(e));
    }
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = regionGet;
