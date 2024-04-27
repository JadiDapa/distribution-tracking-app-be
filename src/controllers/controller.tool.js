const ToolModel = require('../models/model.tool');
const tool = new ToolModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class ToolController {
  static async getTools(req, res) {
    try {
      const results = await tool.getAll();
      return SuccessResponse.DataFound(req, res, 'Tools Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getToolById(req, res) {
    try {
      const toolId = parseInt(req.params.toolId);
      const results = await tool.getById(toolId);
      return SuccessResponse.DataFound(req, res, 'Tool Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createTool(req, res) {
    try {
      const data = req.body;
      const { error } = await Validation.createTool(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await tool.create(data);
      return SuccessResponse.Created(req, res, 'Tool created');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editTool(req, res) {
    try {
      const toolId = parseInt(req.params.toolId);
      const data = req.body;
      const { error } = await Validation.createTool(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const updatedRequest = await tool.editById(toolId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Tool Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteTool(req, res) {
    try {
      const toolId = parseInt(req.params.toolId);
      const deletedRequest = await tool.deleteById(toolId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Tool not found');
      }
      return SuccessResponse.OK(req, res, 'Tool deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = ToolController;
