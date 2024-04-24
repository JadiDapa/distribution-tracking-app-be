const ProductModel = require('../models/model.product');
const product = new ProductModel();

const cartHelper = async (result, userId) => {
  const cartResponse = {
    userId: userId,
    products: [],
    total_items: 0,
    total_price: 0
  };
  for (let i = 0; i < result.length; i++) {
    const productData = await product.getById(result[i].productId);
    cartResponse.products.push({
      id: result[i].product_id,
      name: productData.name,
      quantity: result[i].quantity,
      price: productData.price,
      description: productData.description
    });
    cartResponse.total_items += result[i].quantity;
    cartResponse.total_price += result[i].quantity * productData.price;
  }
  return cartResponse;
};

module.exports = cartHelper;
