const MaterialModel = require('../models/model.material');
const material = new MaterialModel();
const responseHelper = require('../helpers/helper.response');

class MaterialController {
  static async getMaterials(req, res) {
    try {
      const results = await material.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getMaterialById(req, res) {
    try {
      const materialId = parseInt(req.params.materialId);
      const results = await material.getById(materialId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async createMaterial(req, res) {
    try {
      const data = req.body;
      const results = await material.create(data);
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

module.exports = MaterialController;
