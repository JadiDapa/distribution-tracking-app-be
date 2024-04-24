const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/controller.product');

productRouter.get('/products', productController.getProducts);
productRouter.get('/products/:productId', productController.getProductById);

module.exports = productRouter;
