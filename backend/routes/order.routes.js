import { Router } from 'express';
import { 
  addOrder,
  getAllOrders,
  getOrdersByUser,
  getOrdersById,
  updateOrder
} from '../controllers/order.controller.js';
import { verifyAccessToken } from '../middleswares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post("/", verifyAccessToken, addOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/user/:userId", getOrdersByUser);
orderRouter.get("/:orderId", getOrdersById);
orderRouter.patch("/:orderId", updateOrder);

export default orderRouter;