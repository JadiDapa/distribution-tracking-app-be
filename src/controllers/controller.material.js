const MaterialModel = require('../models/model.material');
const material = new MaterialModel();
const ErrorResponse = require('../helpers/helper.error');
const SuccessResponse = require('../helpers/helper.success');
const Validation = require('../helpers/helper.validation');

class MaterialController {
  static async getMaterials(req, res) {
    try {
      const results = await material.getAll();
      return SuccessResponse.DataFound(req, res, 'Materials Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async getMaterialById(req, res) {
    try {
      const materialId = parseInt(req.params.materialId);
      const results = await material.getById(materialId);
      return SuccessResponse.DataFound(req, res, 'Material Found', results);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async createMaterial(req, res) {
    try {
      const data = req.body;
      const pictureUrl = req.fileUrl;
      data.picture = pictureUrl;
      data.categoryId = parseInt(data.categoryId);
      const { error } = await Validation.createMaterial(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const result = await material.create(data);
      return SuccessResponse.Created(req, res, 'Material created', result);
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async editMaterial(req, res) {
    try {
      const materialId = parseInt(req.params.materialId);
      const data = req.body;
      const { error } = await Validation.createMaterial(data);
      if (error) {
        return ErrorResponse.BadRequest(req, res, error.details[0].message);
      }
      const updatedRequest = await material.editById(materialId, data);

      if (!updatedRequest) {
        return ErrorResponse.NotFound(req, res, error.message);
      }

      return SuccessResponse.Created(req, res, 'Material Updated');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }

  static async deleteMaterial(req, res) {
    try {
      const materialId = parseInt(req.params.materialId);
      const deletedRequest = await material.deleteById(materialId);
      if (!deletedRequest) {
        return ErrorResponse.NotFound(req, res, 'Material not found');
      }
      return SuccessResponse.OK(req, res, 'Material deleted');
    } catch (error) {
      return ErrorResponse.InternalServerError(req, res, error.message);
    }
  }
}

module.exports = MaterialController;
