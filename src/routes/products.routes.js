import { Router } from 'express';
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/authorization.middleware.js";
import { 
    deleteProduct, getProducts, getProductById, updateProduct, createProduct,
    deactivateProduct
} from "../controllers/product.controller.js";

const router = Router();

router.get('/products', authenticate, getProducts);

router.delete('/products/:id', authenticate, authorize(["admin"]), deleteProduct);

router.get('/products/:id', authenticate, authorize(["admin"]), getProductById);

router.patch('/products/:id', authenticate, authorize(["admin"]), updateProduct);

router.post('/products', authenticate, authorize(["admin"]), createProduct);

router.patch('/products/:id/deactivate', authenticate, authorize(["admin"]), deactivateProduct);

export default router;