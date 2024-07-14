import { Router } from 'express';
import { 
  addPayment, 
  updatePayment,
  getAllPayments,
  getPaymentsById
} from '../controllers/payment.controller.js';
import { verifyAccessToken } from '../middleswares/auth.middleware.js';

const paymentRouter = Router();

paymentRouter.post("/", verifyAccessToken, addPayment);
paymentRouter.get("/", getAllPayments);
paymentRouter.get("/:paymentId", getPaymentsById);
paymentRouter.patch("/:paymentId", updatePayment);

export default paymentRouter;