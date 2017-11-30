// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.main.getToken);
  app.get('/profile', mid.requiresSecure, controllers.main.mainPage);
  app.get('/about', mid.requiresSecure, controllers.main.mainPage);
  app.get('/donate', mid.requiresSecure, controllers.main.mainPage);
  app.post('/donate', mid.requiresSecure, controllers.main.mainPage);
  app.get('/', mid.requiresSecure, controllers.main.mainPage);
};

module.exports = router;
