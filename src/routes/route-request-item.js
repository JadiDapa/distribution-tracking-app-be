const express = require('express');
const RequestItemRouter = express.Router();
const RequestItemController = require('../controllers/controller.request-item');
const { authCheck } = require('../helpers/helper.authorization');

RequestItemRouter.get(
  '/request-items/:requestId',
  authCheck,
  RequestItemController.getRequestItemsByRequestId
);
RequestItemRouter.get(
  '/request-items/:requestItemId',
  authCheck,
  RequestItemController.getRequestItemById
);
RequestItemRouter.post('/request-items/create', authCheck, RequestItemController.createRequestItem);
RequestItemRouter.put(
  '/request-items/:requestItemId',
  authCheck,
  RequestItemController.editRequestItem
);
RequestItemRouter.delete(
  '/request-items/:requestItemId',
  authCheck,
  RequestItemController.deleteRequestItem
);

module.exports = RequestItemRouter;
