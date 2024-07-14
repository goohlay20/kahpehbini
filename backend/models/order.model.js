import { Schema, model } from 'mongoose';

const orderSchema =  new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    orders: [
      {
        productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required."],
        },
        units: {
          type: Number,
          required: [ true, "Units field is required." ]
        },
      }
    ],
    purchaseDate: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        const tenDaysLater = new Date(currentDate.setDate(currentDate.getDate() + 10));
        return tenDaysLater;
      }
    },
    deliveryFee: {
      type: Number,
      required: [ true, "Delivery fee field is required." ]
    },
    subTotal: {
      type: Number,
      required: [ true, "subTotal field is required." ]
    },
    orderStatus: {
      type: String,
      required: [ true, "Order status field is required." ]
    },
    paymentType: {
      type: String,
      required: [ true, "Payment Type field is required." ]
    },
    paymentStatus: {
      type: String,
      required: [ true, "Payment status field is required." ]
    },
    paymentDate: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
export default Order;