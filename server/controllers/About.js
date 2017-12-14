const models = require('../models');

const Question = models.Question;

// function to create a question
const createQuestion = (request, response) => {
  const req = request;
  const res = response;

  // get paramaters
  const q = `${req.body.question}`;
  const a = `${req.body.answer}`;
  const s = `${req.body.section}`;

  // check to make sure all params are present
  if (!q || !a || !s) {
    return res.status(400).json({
      success: false,
      error: 'missingParams',
      errorFull: 'All fields are required to submit a new question.',
    });
  }

  // create data
  const questionData = {
    question: q,
    answer: a,
    section: s,
  };

  // save the data in the database
  const newQuestion = new Question.QuestionModel(questionData);
  const savePromise = newQuestion.save();

  // check if there's any errors present
  savePromise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'questionAlreadyExists',
        errorFull: 'The question already exists.',
      });
    }

    return res.status(400).json({
      success: false,
      error: 'unknownError',
      errorFull: 'An error occurred, please try again.',
    });
  });

  // return the success
  return savePromise.then(() => res.status(201).json({
    success: true,
    message: 'Question and answer created.',
  }));
};

// function to return all the questions present
const getQuestionList = (req, response) => {
  const res = response;

  return Question.QuestionModel.getAllQuestions((err, docs) => {
    if (err || !docs) {
      return res.status(404).json({
        success: false,
        error: 'questionsNotfound',
        errorFull: 'Could not find any questions or answers.',
      });
    }

    return res.status(200).json({
      success: true,
      docs,
    });
  });
};

module.exports = {
  createQuestion,
  getQuestionList,
};
