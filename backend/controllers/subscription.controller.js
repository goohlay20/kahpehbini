import Subscription from '../models/subscription.model.js'
import { asyncHandler } from '../middleswares/error.middleware.js';

// add new subscription (admin)
const addSubscription = asyncHandler(async (request, response) => {
  const { planName, price, status, subscriptionType} = request.body;

  const newSubscription = new Subscription({
    planName,
    price,
    status,
    subscriptionType
  });
  await newSubscription.save();

  response.status(201).send({
    message: "New subscription has been added.",
    data: newSubscription,
  });
});

// subscription list (admin)
const getAllSubscriptions = asyncHandler(async (request, response)=>{
  const subscriptions = await Subscription.find();

  response.status(200).send({
    message: "List of Subscription.",
    data: subscriptions,
  })
});

// subscription list (admin)
const getSubscriptionById = asyncHandler(async (request, response)=>{
  const { subscriptionId } = request.params;
  
  const subscription = await Subscription.find({ _id: subscriptionId });

  if (!subscription) {
    response.status(400);
    throw new Error("Subscriptio does not exist.");
  } else {
    response.status(200).send({
      message: "List of Subscription.",
      data: subscription,
    });
  }
});

// edit subscription (admin)
const updateSubscription = asyncHandler(async (request, response) => {
  const { subscriptionId } = request.params;
  const updatedDetails = request.body;

  const { matchedCount } = await Subscription.updateOne({ _id: subscriptionId }, {$set: updatedDetails});

  if (!matchedCount) {
    response.status(400).sened({ message: "Subscription does not exist."});
  } else {

    const updatedSubscription = await Subscription.findOne({ _id: subscriptionId });

    response.status(200).send({
      message: "Subscription has been updated.",
      data: updatedSubscription,
    });
  }
});

// remove subscription (admin)
const deleteSubscription = asyncHandler(async (request, response) => {
  const { subscriptionId } = request.params;

  const { deletedCount } = await Subscription.deleteOne({ _id: subscriptionId });

  if(!deletedCount){
    response.status(500);
    throw new Error("Something went wrong while deleting the subscription.");
  } else {
    response.status(204).send();
  }
});

export { addSubscription, getAllSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription };