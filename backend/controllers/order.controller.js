import Order from '../models/order.model.js'
import { asyncHandler } from '../middleswares/error.middleware.js';
import User from '../models/user.model.js';

// add new Order (admin)
const addOrder = asyncHandler(async (request, response) => {
  const { 
    userId, 
    orders, 
    deliveryFee,
    subTotal, 
    orderStatus,
    paymentType,
    paymentStatus
  } = request.body;

  const user = await User.findOne({ _id: userId });
  if (!user){
    response.status(404);
    throw new Error("User does not exist.")
  } else {
    const newOrder = new Order({
      userId,
      orders,
      deliveryFee,
      orderStatus,
      subTotal,
      paymentType,
      paymentStatus
    });
    await newOrder.save();
  
    response.status(201).send({
      message: `User ${userId} placed an order.`,
      data: newOrder,
    });
  }
});

// All Order list (admin)
const getAllOrders = asyncHandler(async (request, response)=>{
  const orders = await Order.find({
    $or: [
      { isDeleted: { $exists: false } }, 
      { isDeleted: false }
    ]
  });

  response.status(200).send({
    message: "List of orders.",
    data: orders,
  });
});

// Order list (customer)
const getOrdersByUser = asyncHandler(async (request, response)=>{
  const { userId } = request.params;
  
  const userOrders = await Order.find({ userId: userId });

  if (!userOrders){
    response.status(404);
    throw new Error("Not found.");
  } else {
    response.status(200).send({
      message: `${userId}'s orders.`,
      data: userOrders,
    });
  }
});

// Order (customer)
const getOrdersById = asyncHandler(async (request, response)=>{
  const { orderId } = request.params;
  
  const userOrders = await Order.find({ _id: orderId });

  if (!userOrders) {
    response.status(400);
    throw new Error("Not found");
  } else {
    response.status(200).send({
      message: "Order Details",
      data: userOrders,
    });
  }
});

// edit Order (admin)
const updateOrder = asyncHandler(async (request, response) => {
  const { orderId } = request.params;
  const updatedData = request.body;

  const { matchedCount } = await Order.updateOne({ _id: orderId }, {$set: updatedData});

  if(!matchedCount){
    response.status(404).send({ message: "Order does not exist." });
  } else {
    const updatedOrder = await Order.findOne({ _id: orderId });
  
    response.status(200).send({
      message: "Order has been updated.",
      data: updatedOrder,
    });
  }
});

// soft delete order
const softDeleteOrder = asyncHandler(async (request, response) => {
  const { orderId } = request.params;
  const updatedData = request.body;

  const { matchedCount } = await Order.updateOne({ _id: orderId }, {$set: updatedData});

  if(!matchedCount){
    response.status(404).send({ message: "Order does not exist." });
  } else {
    const updatedOrder = await Order.findOne({ _id: orderId });
  
    response.status(200).send({
      message: "Order has been deleted.",
      data: updatedOrder,
    });
  }
});

export { addOrder, getAllOrders, getOrdersByUser, updateOrder, getOrdersById };