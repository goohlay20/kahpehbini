import { Schema, model } from 'mongoose';

const subscriptionSchema =  new Schema(
  {
    planName: {
      type: String,
      required: [ true, "Plan name field is required." ]
    },
    price: {
      type: Number,
      required: [ true, "Price field is required." ]
    },
    status: {
      type: String,
      required: [ true, "Status field is required." ]
    },
    subscriptionType: {
      type: String,
      required: [ true, "Subscription type field is required." ]
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = model("Subscription", subscriptionSchema);
export default Subscription;