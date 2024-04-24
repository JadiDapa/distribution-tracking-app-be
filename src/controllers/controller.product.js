const ProductModel = require('../models/model.product');
const product = new ProductModel();
const responseHelper = require('../helpers/helper.response');

class ProductController {
  static async getProducts(req, res) {
    try {
      const results = await product.getAll();
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }

  static async getProductById(req, res) {
    try {
      const productId = parseInt(req.params.productId);
      const results = await product.getById(productId);
      return responseHelper(res, 200, 'success', results);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = ProductController;
