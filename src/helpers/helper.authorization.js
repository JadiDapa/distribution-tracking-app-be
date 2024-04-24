const jwt = require('jsonwebtoken');
const response = require('./helper.error');
const AccountModel = require('../models/model.account');
const account = new AccountModel();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const authCheck = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return response.Unauthorized(res, res, 'Unauthorized: Token not sent');
  }

  const getToken = token.split(' ')[1];

  try {
    const decoded = verifyToken(getToken);
    req.account = decoded;
    next();
  } catch (error) {
    return response.Unauthorized(req, res, 'Unauthorized: you are not authorized');
  }
};

const adminAuthCheck = async (req, res, next) => {
  const decoded = req.account;

  const getAccountId = await account.getById(decoded.id);
  if (!getAccountId) {
    return response.Unauthorized(res, res, 'Unauthorized: Token is not valid');
  }

  const accountUnit = getAccountId.unitId;
  if (accountUnit !== 1) {
    return response.Unauthorized(res, res, 'Unauthorized: Account is not authorized');
  }

  try {
    req.account = accountUnit;
    next();
  } catch (error) {
    return response.Unauthorized(req, res, 'Unauthorized: you are not unoutharized');
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authCheck,
  adminAuthCheck
};
