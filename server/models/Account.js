const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,32}$/,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,32}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  school: {
    type: String,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,128}$/,
  },
  bio: {
    type: String,
    trim: true,
    match: /^[A-Za-z0-9_\-.]{1,400}$/,
  },
});

AccountSchema.statics.toAPI = doc => ({
  email: doc.email,
  _id: doc._id,
});

AccountSchema.statics.findByEmail = (email, callback) => {
  const search = {
    email,
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.findPublicProfileByEmail = (email, callback) => {
  const search = {
    email,
  };

  return AccountModel.findOne(search).select('email firstName lastName school createdDate').exec(callback);
};

AccountSchema.statics.findPublicProfileByID = (_id, callback) => {
  const search = {
    _id,
  };

  return AccountModel.findOne(search).select('email firstName lastName school createdDate').exec(callback);
};

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

AccountSchema.statics.authenticate = (email, password, callback) =>
AccountModel.findByEmail(email, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return validatePassword(doc, password, (result) => {
    if (result === true) {
      return callback(null, doc);
    }

    return callback();
  });
});

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
