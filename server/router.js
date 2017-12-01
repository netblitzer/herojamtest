// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.main.getToken);
  app.get('/profilePublic', mid.requiresSecure, controllers.account.getPublicProfile);
  app.get('/profileMain', mid.requiresSecure, mid.requiresLogin, controllers.main.mainPage);
  app.get('/profileDetails', mid.requiresSecure, mid.requiresLogin, controllers.main.mainPage);
  app.get('/profileSecurity', mid.requiresSecure, mid.requiresLogin, controllers.main.mainPage);
  app.get('/aboutSeach', mid.requiresSecure, controllers.main.mainPage);
  app.get('/donateSeach', mid.requiresSecure, controllers.main.mainPage);
  app.post('/donate', mid.requiresSecure, controllers.main.mainPage);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.account.logout);
  app.get('/isLoggedIn', mid.requiresSecure, controllers.account.isLoggedIn);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.account.signup);
  app.post('/passwordChange', mid.requiresSecure, mid.requiresLogin, controllers.account.passwordChange);
  app.get('/', mid.requiresSecure, controllers.main.mainPage);
};

module.exports = router;
