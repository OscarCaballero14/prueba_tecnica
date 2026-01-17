import {
    createProduct, findAllProducts, deleteProductById,
    updateProduct, findProductById, findProductByName,
    deactivateProduct
} from "../repositories/product.repository.js";
import { ProductResponseDTO } from "../dto/product/productResponse.dto.js";

export const getAllProducts = async () => {
    const products = await findAllProducts();

    return products.map(product => {
        return new ProductResponseDTO(product);
    });
};

export const getProduct = async (prodId) => {
    const product = await findProductById(prodId);

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    return new ProductResponseDTO(product);
};

export const removeProduct = async (prodId) => {
  const product = await findProductById(prodId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  await deleteProductById(prodId);
};

export const update = async (id, prodData) => {
    const product = await findProductById(id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }

    if (prodData.name && prodData.name !== product.name) {
        const nameInUse = await findProductByName(prodData.name);
        if (nameInUse && nameInUse._id.toString() !== id) {
            throw new Error("El nombre del producto ya existe");
        }
    }

    const result = updateProduct(id, prodData);

    return new ProductResponseDTO(result);
}

export const create = async (prodData) => {
    const { name } = prodData;

    const productExist = await findProductByName(name);
    if (productExist) {
        throw new Error("El producto ya existe");
    }

    const result = await createProduct(prodData);

    return new ProductResponseDTO(result);
}

export const deactivate = async (id) => {
    const product = await findProductById(id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }

    const result = await deactivateProduct(id);

    return new ProductResponseDTO(result);
}
