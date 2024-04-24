class ErrorHelper {
  static NotFound = (req, res, message) => {
    return res.status(404).json({
      code: 404,
      status: 'error',
      message: message
    });
  };

  static InternalServerError = (req, res, message) => {
    return res.status(500).json({
      code: 500,
      status: 'error',
      message: message
    });
  };

  static BadRequest = (req, res, message) => {
    return res.status(400).json({
      code: 400,
      status: 'error',
      message: message
    });
  };

  static Unauthorized = (req, res, message) => {
    return res.status(401).json({
      code: 401,
      status: 'error',
      message: message
    });
  };

  static Forbidden = (req, res, message) => {
    return res.status(403).json({
      code: 403,
      status: 'error',
      message: message
    });
  };

  static OK = (req, res, message) => {
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: message
    });
  };

  static DataFound = (req, res, message, data) => {
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: message,
      data: data
    });
  };

  static Created = (req, res, message, data) => {
    return res.status(201).json({
      code: 201,
      status: 'success',
      message: message,
      data: data
    });
  };
}

module.exports = ErrorHelper;
