const express = require('express');
const router = express.Router();
const Question = require('./model').Question;

// router param
router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Document not found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error('Answer not found');
    err.status = 404;
    return next(err);
  }
  return next();
});

// question routes
router.get('/', (req, res, next) => {
  Question.find({}).sort({ createdAt: -1 }).exec((err, questions) => {
    if (err) return next(err);
    res.json(questions);
  });
});

router.post('/', (req, res) => {
  const question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

router.get('/:qID', (req, res) => {
  res.json(req.question);
});

// answer routes
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

router.put('/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

router.delete('/:qID/answers/:aID', (req, res) => {
  req.answer.remove(err => {
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  });
});

router.post(
  '/:qID/answers/:aID/vote-:dec',
  (req, res, next) => {
    if (req.params.dec.search(/^(up|down)$/) === -1) {
      const err = new Error(`Not possible to vot for ${req.params.dec}!`);
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dec;
      next();
    }
  },
  (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  }
);

module.exports = router;
