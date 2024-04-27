const ToolCategoryModel = require('../models/model.tool-category');
const toolCategory = new ToolCategoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class ToolCategoryController {
  static async getToolCategories(req, res) {
    try {
      const results = await toolCategory.getAll();
      return SuccessResponse.DataFound(req, res, 'Tool Categories Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getToolCategoryById(req, res) {
    try {
      const toolCategoryId = parseInt(req.params.toolCategoryId);
      const results = await toolCategory.getById(toolCategoryId);
      return SuccessResponse.DataFound(req, res, 'Tool Category Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createToolCategory(req, res) {
    try {
      const data = req.body;
      const { error } = await Validation.createToolCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await toolCategory.create(data);
      return SuccessResponse.Created(req, res, 'Tool Category created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editToolCategory(req, res) {
    try {
      const toolCategoryId = parseInt(req.params.toolCategoryId);
      const data = req.body;
      const { error } = await Validation.createToolCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const updatedRequest = await toolCategory.editById(toolCategoryId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Tool Category Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteToolCategory(req, res) {
    try {
      const toolCategoryId = parseInt(req.params.toolCategoryId);
      const deletedRequest = await toolCategory.deleteById(toolCategoryId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Tool  not found');
      }
      return SuccessResponse.OK(req, res, 'Tool Category deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = ToolCategoryController;
