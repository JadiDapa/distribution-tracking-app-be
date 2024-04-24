const ToolModel = require('../models/model.tool');
const tool = new ToolModel();
const responseHelper = require('../helpers/helper.response');

class ToolController {
  static async getTools(req, res) {
    try {
      const results = await tool.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getToolById(req, res) {
    try {
      const toolId = parseInt(req.params.toolId);
      const results = await tool.getById(toolId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async createTool(req, res) {
    try {
      const data = req.body;
      const results = await tool.create(data);
      return responseHelper(res, 201, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = ToolController;
