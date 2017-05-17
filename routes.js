const express = require('express');
const router = express.Router();

// question routes
router.get('/', (req, res) => {
  res.json({ response: 'a GET request for LOOKING at questions' });
});

router.post('/', (req, res) => {
  res.json({
    response: 'a POST request for CREATING questions',
    body: req.body
  });
});

router.get('/:qID', (req, res) => {
  res.json({
    response: `a GET request for LOOKING at a special answer id: ${req.params.qID}`
  });
});

// answer routes
router.post('/:qID/answers', (req, res) => {
  res.json({
    response: 'a POST request for CREATING answers',
    question: req.params.qID,
    body: req.body
  });
});

router.put('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: 'a PUT request for EDITING answers',
    question: req.params.qID,
    answer: req.params.aID,
    body: req.body
  });
});

router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: 'a DELETE request for DELETING answers',
    question: req.params.qID,
    answer: req.params.aID,
    body: req.body
  });
});

router.post('/:qID/answers/:aID/vote-:dec', (req, res) => {
  res.json({
    response: 'a POST request for VOTING on answers',
    question: req.params.qID,
    answer: req.params.aID,
    vote: req.params.dec,
    body: req.body
  });
});

module.exports = router;
