// Used for the about page

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let QuestionModel = {};

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
  section: {
    type: String,
    required: true,
    trim: true,
  },
});

// finds a question/answer combo based on the question
QuestionSchema.statics.findByQuestion = (question, callback) => {
  const search = {
    question,
  };

  return QuestionModel.find(search).exec(callback);
};
// finds a question/answer combo based on the answer
QuestionSchema.statics.findByAnswer = (answer, callback) => {
  const search = {
    answer,
  };

  return QuestionModel.find(search).exec(callback);
};
// returns all the questions in the database
QuestionSchema.statics.getAllQuestions = callback => QuestionModel.find().exec(callback);

QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = {
  QuestionModel,
  QuestionSchema,
};
