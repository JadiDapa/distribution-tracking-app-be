const RequestItemModel = require('../models/model.request-item');
const requestItem = new RequestItemModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class RequestItemController {
  static async getRequestItemsByRequestId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await requestItem.getAllByRequestId(accountId);
      return SuccessResponse.DataFound(req, res, 'Request Items Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getRequestItemById(req, res) {
    try {
      const requestItemId = parseInt(req.params.requestItemId);
      const results = await requestItem.getById(requestItemId);
      return SuccessResponse.DataFound(req, res, 'Request Item Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createRequestItem(req, res) {
    try {
      const request = req.result;
      const items = req.items;
      request.code = items.code;
      // const result = await requestItem.create(request, items);
      return SuccessResponse.Created(req, res, 'Request Item created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editRequestItem(req, res) {
    try {
      const requestItemId = parseInt(req.params.requestItemId);
      const data = req.body;
      const updatedRequest = await requestItem.editById(requestItemId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Request Item created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteRequestItem(req, res) {
    try {
      const requestItemId = parseInt(req.params.requestItemId);
      const deletedRequest = await requestItem.deleteById(requestItemId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Request Item not found');
      }
      return SuccessResponse.OK(req, res, 'Request Item deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = RequestItemController;
