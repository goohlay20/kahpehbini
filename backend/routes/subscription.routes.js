import { Router } from 'express';
import { 
  addSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post("/", addSubscription);
subscriptionRouter.get("/", getAllSubscriptions);
subscriptionRouter.get("/:subscriptionId", getSubscriptionById);
subscriptionRouter.patch("/:subscriptionId", updateSubscription);
subscriptionRouter.delete("/:subscriptionId", deleteSubscription);

export default subscriptionRouter;