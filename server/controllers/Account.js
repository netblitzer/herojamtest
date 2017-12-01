const models = require('../models');

const Account = models.Account;

const isLoggedIn = (req, res) => {
  if (req.session.account) {
    return res.json({
      loggedin: true,
      message: 'User is logged in.',
    });
  }
  return res.json({
    loggedin: false,
    message: 'User is not logged in.',
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({
    loggedin: false,
    message: 'Log out successful.',
  });
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const email = `${req.body.email}`;
  const pass = `${req.body.pass}`;

  if (!email || !pass) {
    return res.status(400).json({
      loggedin: false,
      error: 'missingParams',
      errorFull: 'All fields are required to log in.',
    });
  }

  return Account.AccountModel.authenticate(email, pass, (err, account) => {
    if (err || !account) {
      return res.status(400).json({
        loggedin: false,
        error: 'incorrectUserPass',
        errorFull: 'Incorrect email or password.',
      });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({
      loggedin: true,
      message: 'Log in successful.',
    });
  });
};

const passwordChange = (request, response) => {
  const req = request;
  const res = response;

  const oldpass = `${req.body.oldpass}`;
  const newpass = `${req.body.newpass}`;

  if (!oldpass || !newpass) {
    return res.status(400).json({
      loggedin: false,
      error: 'missingParams',
      errorFull: 'All fields are required to change the password.',
    });
  }

  if (oldpass === newpass) {
    return res.status(400).json({
      loggedin: false,
      error: 'noChange',
      errorFull: 'Passwords did not change.',
    });
  }

  return Account.AccountModel.authenticate(req.session.account.email, oldpass, (err, acc) => {
    if (err || !acc) {
      return res.status(400).json({
        loggedin: false,
        error: 'incorrectUserPass',
        errorFull: 'Incorrect current password.',
      });
    }

    const account = acc;

    return Account.AccountModel.generateHash(newpass, (salt, hash) => {
      account.password = hash;
      account.salt = salt;

      const savePromise = account.save();

      savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(account);
        return res.json({
          loggedin: true,
          message: 'Password changed successfully.',
        });
      });

      savePromise.catch((error) => {
        console.log(error);

        if (error.code === 11000) {
          return res.status(400).json({
            loggedin: false,
            error: 'userAlreadyExists',
            errorFull: 'The email already exists.',
          });
        }

        return res.status(400).json({
          loggedin: false,
          error: 'unknownError',
          errorFull: 'An error occurred, please try again.',
        });
      });
    });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  const email = `${req.body.email}`;
  const first = `${req.body.first}`;
  const last = `${req.body.last}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!email || !pass || !pass2 || !first || !last) {
    return res.status(400).json({
      loggedin: false,
      error: 'missingParams',
      errorFull: 'All fields are required to log in.',
    });
  }

  if (pass !== pass2) {
    return res.status(400).json({
      loggedin: false,
      error: 'passwordsNotMatching',
      errorFull: 'The passwords do not match.',
    });
  }

  return Account.AccountModel.generateHash(pass, (salt, hash) => {
    const accountData = {
      email,
      firstName: first,
      lastName: last,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({
        loggedin: true,
        message: 'Account creation successful.',
      });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({
          loggedin: false,
          error: 'userAlreadyExists',
          errorFull: 'The email already exists.',
        });
      }

      return res.status(400).json({
        loggedin: false,
        error: 'unknownError',
        errorFull: 'An error occurred, please try again.',
      });
    });
  });
};

const getPublicProfile = (request, response) => {
  const req = request;
  const res = response;

  let email = `${req.body.email}`;

  if (req.body.email !== undefined && email) {
    return Account.AccountModel.findPublicProfileByEmail(email, (err, profile) => {
      if (err || !profile) {
        return res.status(404).json({
          error: 'unknownUser',
          errorFull: 'Could not find the profile of the user with that email.',
        });
      }

      return res.json(profile);
    });
  }
  email = req.session.account.email;

  return Account.AccountModel.findPublicProfileByEmail(email, (err, profile) => {
    if (err || !profile) {
      return res.status(404).json({
        error: 'unknownUser',
        errorFull: 'Could not find the profile of your account.',
      });
    }

    return res.json(profile);
  });
};

module.exports = {
  isLoggedIn,
  logout,
  login,
  signup,
  getPublicProfile,
  passwordChange,
};
