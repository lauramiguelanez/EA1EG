const express = require('express');
const router = express.Router();

/* PING*/
router.get('/', (req, res, next) => {
  res.status(200).json({ OK: true });
});

module.exports = router;
