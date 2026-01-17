import { responseSuccess, responseError } from "../utils/response.js";
import { 
    getAllProducts, getProduct, removeProduct,
    update, create, deactivate
} from "../services/product.service.js";
import { CreateProductDTO } from "../dto/product/createProduct.dto.js";
import { UpdateProductDTO } from "../dto/product/updateProduct.dto.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return responseSuccess(res, products, 200);
  } catch (error) {
    return responseError(res, error.message, 500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    return responseSuccess(res, product, 200);
  } catch (error) {
    return responseError(res, error.message, 404);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await removeProduct(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    return responseError(res, error.message, 404);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const createProductDTO = new UpdateProductDTO(req.body);
    
    const product = await update(req.params.id, createProductDTO);

    return responseSuccess(
      res,
      {
        message: "El registro se ha actualizado correctamente",
        product: product
      },
      201
    );
  } catch (error) {
    return responseError(res, error.message, 400);
  }
}

export const createProduct = async (req, res) => {
  try{
    const createProductDTO = new CreateProductDTO(req.body);

    const product = await create(createProductDTO);

    return responseSuccess(
      res,
      {
        message: "El registro se ha realizado correctamente",
        product: product
      },
      201
    );
  }catch(error){
    return responseError(res, error.message, 400);
  }
}

export const deactivateProduct = async (req, res) => {
  try {
    const product = await deactivate(req.params.id);
    return responseSuccess(
        res, 
        {
            message: "El registro se ha desactivado correctamente",
            product: product
        }, 
        200
    );
  } catch (error) {
    return responseError(res, error.message, 404);
  }
}