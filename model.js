const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sortAnswers = (a, b) => {
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
};

const AnswerSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

AnswerSchema.method('update', function(updates, callback) {
  Object.assign(this, updates, { updatedAt: new Date() });
  this.parent().save(callback);
});

AnswerSchema.method('vote', function (vote, callback) {
  if (vote === 'up') {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

const QuestionSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  answers: [AnswerSchema]
});

QuestionSchema.pre('save', function (next) {
  this.answers.sort(sortAnswers);
  next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;
