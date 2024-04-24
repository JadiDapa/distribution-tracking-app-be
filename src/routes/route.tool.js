const express = require('express');
const ToolRouter = express.Router();
const ToolController = require('../controllers/controller.tool');

ToolRouter.get('/tools', ToolController.getTools);
ToolRouter.get('/tools/:toolId', ToolController.getToolById);
ToolRouter.post('/tools/create', ToolController.createTool);

module.exports = ToolRouter;
