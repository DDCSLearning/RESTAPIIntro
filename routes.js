const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ response: 'a GET request' });
});

router.post('/', (req, res) => {
  res.json({ response: 'a POST request', body: req.body });
});

router.get('/:id', (req, res) => {
  res.json({ response: `a GET request for special id: ${req.params.id}`});
});

module.exports = router;
