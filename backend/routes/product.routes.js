import { Router } from 'express';
import multer from 'multer';
import { storage } from '../config/storage.js';
import { 
  addProduct, 
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const productRouter = Router();
const productImage = multer({ storage });

productRouter.post( "/", productImage.single("product-image"), addProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);
productRouter.patch("/:productId", productImage.single("product-image"), updateProduct);
productRouter.delete("/:productId/:imageFilename", deleteProduct);

export default productRouter;