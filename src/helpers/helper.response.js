const response = (res, status, message, data, token) => {
  return res.status(status).json({
    code: status,
    status: message,
    data: data,
    token: token
  });
};

module.exports = response;
