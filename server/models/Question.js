// Used for the about page

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionModel = {};

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

QuestionSchema.statics.findByQuestion = (question, callback) => {
  const search = {
    question,
  };

  return QuestionModel.find(search, callback);
};

QuestionSchema.statics.findByAnswer = (answer, callback) => {
  const search = {
    answer,
  };

  return QuestionModel.find(search, callback);
};

module.exports = {
  QuestionModel,
  QuestionSchema,
};
