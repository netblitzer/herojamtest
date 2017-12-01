const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.json({
      loggedin: false,
      message: 'You must be logged in to view this content.',
    });
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.json({
      loggedin: true,
      message: 'Already logged into an account. Please log out and try again.',
    });
  }
  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${res.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => next();

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
