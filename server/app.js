// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const csrf = require('csurf');

const config = require('./config.js');

// connect to database
mongoose.connect(config.dburl, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// pull in our routes
const router = require('./router.js');

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
// app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    pass: config.redis.pass,
  }),
  secret: config.sessions.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.use(cookieParser());

// csrf must come AFTER app.use(cookirParser());
// and app.use(session({...}));
// should also come BEFORE router(app);
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(config.http.port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on ${config.http.baseUrl}`);
});
