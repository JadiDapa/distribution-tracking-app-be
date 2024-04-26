const express = require('express');
const ToolRouter = express.Router();
const ToolController = require('../controllers/controller.tool');
const { authCheck } = require('../helpers/helper.authorization');

ToolRouter.get('/tools', authCheck, ToolController.getTools);
ToolRouter.get('/tools/:toolId', authCheck, ToolController.getToolById);
ToolRouter.post('/tools/create', authCheck, ToolController.createTool);
ToolRouter.put('/tools/:toolId', authCheck, ToolController.editTool);
ToolRouter.delete('/tools/:toolId', authCheck, ToolController.deleteTool);

module.exports = ToolRouter;
