const models = require('../models');

const Question = models.Question;

const createQestion = (request, response) => {
  const req = request;
  const res = response;
  
  const q = `${req.body.question}`;
  const a = `${req.body.answer}`;
  
  if (!q || !a) {
    return res.status(400).json({
      error: 'missingParams',
      errorFull: 'All fields are required to submit a new question.',
    });
  }
  
  const questionData = {
    question: q,
    answer: a,
  };
  
  const newQuestion = new Question.QuestionModel(questionData);
  
  const savePromise = newQuestion.save();
  
  savePromise.then(() => {
    return res.status(201).json({
      success: true,
      message: 'Question and answer created.',
    });
  });
  
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
};