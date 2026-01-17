import Product from "../models/products.js";

export const createProduct = async (prodData) => {
  return await Product.create(prodData);
};

export const findAllProducts = async () => {
  return await Product.find();
};

export const deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const updateProduct = async (id, prodData) => {
  return await Product.findByIdAndUpdate(id, prodData, {
    new: true,
    runValidators: true
  });
}

export const findProductById = async (id) => {
  return await Product.findById(id);
};

export const findProductByName = async (name) => {
  return await Product.findOne({ name });
};

export const deactivateProduct = async (id) => {
    return await Product.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true, runValidators: true }
    );
}