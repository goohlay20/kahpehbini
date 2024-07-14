import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import { asyncHandler } from '../middleswares/error.middleware.js';

// add new Payment (admin)
const addPayment = asyncHandler(async (request, response) => {
  const {
    userId,
    orderId,
    total,
    type,
    referenceNo,
    status
  } = request.body;

  const user =  await User.findOne({ _id: userId });
  const order = await Order.findOne({ _id: orderId });

  if(!user || !order){
    response.status(404);
    throw new Error("Not Found.");
  } else {
    const newPayment = new Payment({
      userId,
      orderId,
      total,
      type,
      referenceNo,
      status
    });
    await newPayment.save();

    response.status(201).send({
      message: `${userId} created payment details.`,
      data: newPayment,
    });
  }
});

// edit Payment (admin)
const updatePayment = asyncHandler(async (request, response) => {
  const { paymentId } = request.params;
  const updatedDetails = request.body;

  const { matchedCount } = await Payment.updateOne({ _id: paymentId }, { $set:updatedDetails });

  if(!matchedCount){
    response.status(404).send({ message: "Payment does not exist." });
  } else {
    const updatedPayment = await Payment.findOne({ _id: paymentId });

    response.status(200).send({
      message: "Payment has been updated.",
      data: updatedPayment,
    });
  };
});

// view all Payment (admin)
const getAllPayments =  asyncHandler(async (request, response) => {
  const payments = await Payment.find();

  response.status(200).send({
    message: "List of payments.",
    data: payments,
  });
});

// view all Payment (admin)
const getPaymentsById =  asyncHandler(async (request, response) => {
  const { paymentId } = request.params;
  const payments = await Payment.findOne({ _id: paymentId });

  response.status(200).send({
    message: `Payment ${paymentId}`,
    data: payments,
  });
});

export { addPayment, updatePayment, getAllPayments, getPaymentsById };