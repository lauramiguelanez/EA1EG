const express = require('express');
const _ = require('lodash');

const postcardCRUD = (Postcard, extensionFn) => {
  let router = express.Router();

  // Detect paths from model
  let notUsedPaths = ['_id', 'updated_at', 'created_at', '__v'];
  let paths = Object.keys(Postcard.schema.paths).filter(e => !notUsedPaths.includes(e));

  if (extensionFn) {
    router = extensionFn(router);
  }
  // CRUD: RETRIEVE
  router.get('/', (req, res, next) => {
    Postcard.find({})
      .then(objList => {
        // console.log('objList', objList);
        return res.status(200).json(objList);
      })
      .catch(e => next(e));
  });

  router.get('/:page/:batch', (req, res, next) => {
    const batchSize = 12;
    const { batch } = req.params;
    const skip = (batch || 0) * batchSize;
    Postcard.find({})
      .skip(skip)
      .limit(batchSize)
      .sort({_id:-1})
      .then(objList => {
        // console.log('objList', objList);
        return res.status(200).json(objList);
      })
      .catch(e => next(e));
  });


  router.post('/many',(req, res, next) => {
    const { ids } = req.body;
    Postcard.find({"_id" : {"$in" : ids}})
      .sort({"_id":-1})
      .then(objList => {
        // console.log('objList', objList);
        return res.status(200).json(objList);
      })
      .catch(e => next(e));
  });

  router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Postcard.findById(id)
      .then(obj => res.status(200).json(obj))
      .catch(e => next(e));
  });

  // CRUD: CREATE
  router.post('/', (req, res, next) => {
    const object = _.pickBy(req.body, (e, k) => paths.includes(k));
    Postcard.create(object)
      .then(obj => res.status(200).json(obj))
      .catch(e => next(e));
  });

  // CRUD: UPDATE
  router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const object = _.pickBy(req.body, (e, k) => paths.includes(k));
    const updates = _.pickBy(object, _.identity);
    // console.log(updates);
    Postcard.findByIdAndUpdate(id, updates, { new: true })
      .then(obj => {
        res.status(200).json({ status: 'updated', obj });
      })
      .catch(e => next(e));
  });

  // CRUD: DELETE
  router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Postcard.findByIdAndRemove(id)
      .then(obj => {
        if (obj) {
          res.status(200).json({ status: `Removed from db` });
        } else {
          throw new Error('Not existing ID');
        }
      })
      .catch(e => next(e));
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message });
  });

  return router;
};

module.exports = postcardCRUD;
