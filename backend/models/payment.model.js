import { Schema, model } from 'mongoose';

const paymentSchema =  new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [ true, "User Id field is required." ]
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [ true, "Order Id field is required." ]
    },
    total: {
      type: Number,
      required: [ true, "Total field is required." ]
    },
    type: {
      type: String,
      required: [ true, "Type field is required." ]
    },
    referenceNo: {
      type: String,
      required: [ true, "Reference no. field is required." ]
    },
    status: {
      type: String,
      required: [ true, "Status field is required." ]
    },
    paymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);
export default Payment;