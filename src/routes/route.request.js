const express = require('express');
const RequestRouter = express.Router();
const RequestController = require('../controllers/controller.request');
const { authCheck } = require('../helpers/helper.authorization');
const uploadPdf = require('../middleware/middleware.upload-pdf');

RequestRouter.get('/requests/:accountId', authCheck, RequestController.getRequestsByAccountId);
RequestRouter.get(
  '/requests/inbox/:accountId',
  authCheck,
  RequestController.getRequestsByRequestedId
);
RequestRouter.get(
  '/requests/detail/:requestId',
  authCheck,
  RequestController.getRequestByAccountIdAndById
);
RequestRouter.post('/requests/create', authCheck, RequestController.createRequest);
RequestRouter.put('/requests/sign/:requestId', authCheck, uploadPdf, RequestController.signRequest);
RequestRouter.put('/requests/:requestId', authCheck, RequestController.handleRequest);
RequestRouter.delete('/requests/:requestId', authCheck, RequestController.deleteRequest);

module.exports = RequestRouter;
