const MaterialCategoryModel = require('../models/model.material-category');
const materialCategory = new MaterialCategoryModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class MaterialCategoryController {
  static async getMaterialCategories(req, res) {
    try {
      const results = await materialCategory.getAll();
      return SuccessResponse.DataFound(req, res, 'Material Categories Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getMaterialCategoryById(req, res) {
    try {
      const materialCategoryId = parseInt(req.params.materialCategoryId);
      const results = await materialCategory.getById(materialCategoryId);
      return SuccessResponse.DataFound(req, res, 'Material Category Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createMaterialCategory(req, res) {
    try {
      const data = req.body;
      const { error } = await Validation.createMaterialCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await materialCategory.create(data);
      return SuccessResponse.Created(req, res, 'Material Category created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editMaterialCategory(req, res) {
    try {
      const materialCategoryId = parseInt(req.params.materialCategoryId);
      const data = req.body;
      const { error } = await Validation.createMaterialCategory(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const updatedRequest = await materialCategory.editById(materialCategoryId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Material Category Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteMaterialCategory(req, res) {
    try {
      const materialCategoryId = parseInt(req.params.materialCategoryId);
      const deletedRequest = await materialCategory.deleteById(materialCategoryId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Material  not found');
      }
      return SuccessResponse.OK(req, res, 'Material Category deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = MaterialCategoryController;
