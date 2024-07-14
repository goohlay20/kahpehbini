import { Schema, model } from 'mongoose';

const productSchema =  new Schema(
  {
    itemName: {
      type: String,
      required: [ true, "Item name field is required." ]
    },
    description: {
      type: String,
      required: [ true, "Item name field is required." ]
    },
    stockOnHand: {
      type: Number,
      required: [ true, "Unit field is required." ]
    },
    unitPrice: {
      type: Number,
      required: [ true, "Price field is required." ]
    },
    image: {
      path:{
        type: String,
        required: [true, "Image path is required."],
      },
      filename: {
        type: String,
        required: [true, "Image filename is required."],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
export default Product;