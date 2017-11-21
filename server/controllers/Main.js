const path = require('path');

const mainPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../hosted/index.html'));
};


const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports = {
  mainPage,
  getToken,
};
