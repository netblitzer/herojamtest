const models = require('../models');

const Account = models.Account;

// check to see if the user is already logged in
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

// logout function
const logout = (req, res) => {
  req.session.destroy();
  res.json({
    loggedin: false,
    message: 'Log out successful.',
  });
};

// login function
const login = (request, response) => {
  const req = request;
  const res = response;

  const email = `${req.body.email}`;
  const pass = `${req.body.pass}`;

  // check for valid params
  if (!email || !pass) {
    return res.status(400).json({
      loggedin: false,
      error: 'missingParams',
      errorFull: 'All fields are required to log in.',
    });
  }

  // authenticate user
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

// password change function
const passwordChange = (request, response) => {
  const req = request;
  const res = response;

  const oldpass = `${req.body.oldpass}`;
  const newpass = `${req.body.newpass}`;

  // check for valid params
  if (!oldpass || !newpass) {
    return res.status(400).json({
      loggedin: true,
      error: 'missingParams',
      errorFull: 'All fields are required to change the password.',
    });
  }
  // check if passwords changed
  if (oldpass === newpass) {
    return res.status(400).json({
      loggedin: true,
      error: 'noChange',
      errorFull: 'Passwords did not change.',
    });
  }

  // authenticate user
  return Account.AccountModel.authenticate(req.session.account.email, oldpass, (err, acc) => {
    if (err || !acc) {
      return res.status(400).json({
        loggedin: true,
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

        // this error should never happen during a password change
        if (error.code === 11000) {
          return res.status(400).json({
            loggedin: true,
            error: 'userAlreadyExists',
            errorFull: 'The email already exists.',
          });
        }

        return res.status(400).json({
          loggedin: true,
          error: 'unknownError',
          errorFull: 'An error occurred, please try again.',
        });
      });
    });
  });
};

// signup function
const signup = (request, response) => {
  const req = request;
  const res = response;

  const email = `${req.body.email}`;
  const first = `${req.body.first}`;
  const last = `${req.body.last}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // check for valid params
  if (!email || !pass || !pass2 || !first || !last) {
    return res.status(400).json({
      loggedin: false,
      error: 'missingParams',
      errorFull: 'All fields are required to log in.',
    });
  }

  // check if password params match
  if (pass !== pass2) {
    return res.status(400).json({
      loggedin: false,
      error: 'passwordsNotMatching',
      errorFull: 'The passwords do not match.',
    });
  }

  // create the new account
  return Account.AccountModel.generateHash(pass, (salt, hash) => {
    const accountData = {
      email,
      firstName: first,
      lastName: last,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    // save the account
    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({
        loggedin: true,
        message: 'Account creation successful.',
        redirect: 'Home',
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

// get the public profile of a user
const getPublicProfile = (request, response) => {
  const req = request;
  const res = response;

  let email = `${req.body.email}`;

  // check to see if there's an email
  if (req.body.email !== undefined && email) {
    // search for a profile that was input
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

  // search for your own profile
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
