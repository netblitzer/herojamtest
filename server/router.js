// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.main.getToken);
  app.get('/', mid.requiresSecure, controllers.main.mainPage);
};

module.exports = router;
