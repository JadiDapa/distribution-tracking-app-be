const express = require('express');
const ToolRouter = express.Router();
const ToolController = require('../controllers/controller.tool');
const { authCheck, adminAuthCheck } = require('../helpers/helper.authorization');
const uploadMiddleware = require('../middleware/middleware.upload-file');

ToolRouter.get('/tools', authCheck, ToolController.getTools);
ToolRouter.get('/tools/:toolId', authCheck, ToolController.getToolById);
ToolRouter.post(
  '/tools/create',
  authCheck,
  adminAuthCheck,
  uploadMiddleware,
  ToolController.createTool
);
ToolRouter.put('/tools/:toolId', authCheck, ToolController.editTool);
ToolRouter.delete('/tools/:toolId', authCheck, ToolController.deleteTool);

module.exports = ToolRouter;
