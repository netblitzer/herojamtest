require('dotenv').config();
const url = require('url');

const env = process.env.NODE_ENV || 'development';

const staticAssets = {
  // asset path for devs
  development: {
    path: 'clientDEV/',
  },
  // asset paths for testing
  test: {
    path: 'clientDEV/',
  },
  // asset paths for staging
  // Staging environments are a complete mirror of production so that when it
  // goes into production, you know it has been tested on the exact
  // settings/versions/software/hardware/configuration as the real one
  staging: {
    path: 'client/',
  },
  // asset paths for production
  production: {
    path: 'client/',
  },

};

const http = {
  // http config vars for dev
  development: {
    port: 3000,
    baseUrl: 'http://localhost:3000',
  },
  // http config vars for test
  test: {
    port: 3000,
    baseUrl: 'http://localhost:3000',
  },
  // http config vars for staging
  staging: {
    port: process.env.PORT || process.env.NODE_PORT || 3000,
    baseUrl: 'http://herojam-test.herokuapp.com',
  },
  // http config vars for production
  production: {
    port: process.env.PORT || process.env.NODE_PORT || 3000,
    baseUrl: 'http://herojam-test.herokuapp.com',
  },
};

// object for our mongo or other db config
// again everything is by a common environment key so we can just grab all of
// the variables for our current environment
const DB = {
  // local database (use a different database for each so you don't pollute
  // your environment with malformed data)
  development: {
    host: 'localhost',
    database: 'dev_HeroJam',
  },
  // test database (use a different database for each so you don't pollute
  // your environment with malformed data)
  test: {
    host: 'localhost',
    database: 'test_HeroJam',
  },
  // staging database (use a different database for each so you don't pollute
  // your environment with malformed data)
  staging: {
    host: undefined, // stored in MONGO_LAB process ENV variable for heroku
    database: 'staging_HeroJam',
  },
  // production database (use a different database for each so you don't pollute
  // your environment with malformed data)
  production: {
    host: undefined, // stored in MONGO_LAB process ENV variable for heroku
    database: 'production_HeroJam',
  },
};

// default redis URL to work with
let redisURL = {
  hostname: 'localhost',
  port: 6379,
};
// redis pass var
let redisPASS;
// if using Redis Cloud, then parse the URL for host, port and authentication
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}

// object for redis
// again everything is by a common environment key so we can just grab all of
// the variables for our current environment
const redis = {
  // dev for redis (no pass locally unless you set on yourself)
  development: {
    host: 'localhost',
    port: 6379,
    pass: undefined,
  },
  // test for redis (no pass locally unless you set on yourself)
  test: {
    host: 'localhost',
    port: 6379,
    pass: undefined,
  },
  // staging for redis (using given pass from Heroku, another cloud or your own servers)
  staging: {
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS || undefined,
  },
  // production for redis (using given pass from Heroku, another cloud or your own servers)
  production: {
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS || undefined,
  },
};

// object for express session
// again everything is by a common environment key so we can just grab all of
// the variables for our current environment
const sessions = {
    // development session key
  development: {
    secret: process.env.sessionSecret || 'Session Key',
  },
    // test session key
  test: {
    secret: process.env.sessionSecret || 'Session Key',
  },
    // staging session key
  staging: {
    secret: process.env.sessionSecret || 'e0c6821fddcb4b19bf38e8b9c8366d5a',
  },
    // production session key
  production: {
    secret: process.env.sessionSecret || 'e0c6821fddcb4b19bf38e8b9c8366d5a',
  },
};

// function to help build a proper mongodb protocol string
const dburl = () => {
  const db = DB[env];
  const auth = (db.username && db.password ? `${db.username}:${db.password}@` : '');
  const port = (db.port ? `:${db.port}` : '');
  if (env === 'staging' || env === 'production') {
    return process.env.MONGODB_URI;
  }
  return `mongodb://${auth}${db.host}${port}/${db.database}`;
};

// return an appropriate object of your environment
// The keys are all indexed by the current environment, so outside of this file
// all of the config calls only show the ones for the current environment
const get = () =>
   ({
     env,
     http: http[env],
     dburl: dburl(env),
     staticAssets: staticAssets[env],
     redis: redis[env],
     sessions: sessions[env],
   })
;

// export the result of the function and other files can't get into the
// internals of other environments
// since we only export the result of the current environment.
module.exports = get();
