const RequestModel = require('../models/model.request');
const request = new RequestModel();
const RequestItemModel = require('../models/model.request-item');
const requestItem = new RequestItemModel();
const MaterialInventoryModel = require('../models/model.material-inventory');
const materialInventory = new MaterialInventoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class RequestController {
  static async getRequestsByAccountId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await request.getAllByUserId(accountId);
      return SuccessResponse.DataFound(req, res, 'Requests Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getRequestsByRequestedId(req, res) {
    try {
      const accountId = parseInt(req.params.accountId);
      const results = await request.getAllByRequestedId(accountId);
      return SuccessResponse.DataFound(req, res, 'Requests Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getRequestByAccountIdAndById(req, res) {
    try {
      const requestId = parseInt(req.params.requestId);
      const results = await request.getById(requestId);
      return SuccessResponse.DataFound(req, res, 'Request Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createRequest(req, res) {
    try {
      const { items, ...data } = req.body;
      const { error } = await Validation.createRequest(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const requestResult = await request.create(data);
      const result = await requestItem.create(requestResult, items);
      return SuccessResponse.Created(req, res, 'Request Found', { requestResult, result });
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async handleRequest(req, res) {
    try {
      const requestId = parseInt(req.params.requestId);
      const { items, ...data } = req.body;
      const { error } = await Validation.createRequest(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }

      const updatedRequest = await request.editById(requestId, data);
      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      if (data.status === 'rejected') {
        return SuccessResponse.OK(req, res, 'Request Declined');
      }

      const updatedItems = await requestItem.handleRequestItem(updatedRequest, items);
      await materialInventory.acceptStock(updatedRequest, updatedItems);
      return SuccessResponse.Created(req, res, 'Request Updated', updatedItems);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  // static async editRequest(req, res) {
  //   try {
  //     const requestId = parseInt(req.params.requestId);
  //     const data = req.body;
  //     const { error } = await Validation.createRequest(requestId, data);
  //     if (error) {
  //       return ErrorResponse.BadRequest(req, res, error.details[0].message);
  //     }
  //     const updatedRequest = await request.editById(requestId, newData);

  //     if (!updatedRequest) {
  //       return ErrorResponse.NotFound(req, res, error.message);
  //     }

  //     return SuccessResponse.Created(req, res, 'Request created', result);
  //   } catch (error) {
  //     return ErrorResponse.InternalServerError(req, res, error.message);
  //   }
  // }

  static async deleteRequest(req, res) {
    try {
      const requestId = parseInt(req.params.requestId);
      const deletedRequest = await request.deleteById(requestId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Account not found');
      }
      return SuccessResponse.OK(req, res, 'Request deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = RequestController;
