import Product from '../models/product.model.js';
import { asyncHandler } from '../middleswares/error.middleware.js';
import { cloudinary } from '../config/storage.js';

// add new product (admin)
const addProduct = asyncHandler(async (request, response) => {
  const { itemName, unitPrice, stockOnHand, description } = request.body;
  const { path, filename } = request.file;

  const newProduct = new Product({
    itemName,
    stockOnHand,
    unitPrice,
    description,
    image: { path, filename },
  });
  await newProduct.save();

  response.status(201).send({
    message: "New product has been added.",
    date: newProduct,
  });
});

// product list (admin and customer)
const getAllProducts = asyncHandler(async (request, response)=>{
  const products = await Product.find();

  response.status(200).send({
    message: "List of products.",
    data: products,
  });
});

// product list (admin and customer)
const getProductById = asyncHandler(async (request, response)=>{
  const { productId } = request.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    response.status(404);
    throw new Error("Product no found.");
  } else {
    response.status(200).send({
      message: "Product details",
      data: product,
    });
  }
});

// edit product (admin)
const updateProduct = asyncHandler(async (request, response) => {
  const { productId } = request.params;
  let updatedDetails = request.body;
  let prevImage = {};

  if (request.file) {
    const { path, filename } = request.file;
    updatedDetails = {...updatedDetails, image: { path, filename },};
    prevImage = await Product.findOne({ _id: productId }).select('image.filename');
  }

  const { matchedCount } = await Product.updateOne({ _id: productId }, {$set:updatedDetails});

   if(!matchedCount){
    response.status(404).send({ message: "Product does not exist." });
   } else {
    if(prevImage.image !== undefined){
      await cloudinary.uploader.destroy(prevImage.image.filename);
    }

    const updatedProduct = await Product.findOne({ _id: productId});

    response.status(200).send({
      message: "Product has been updated.",
      data:  updatedProduct
    });
   }
});

// remove product (admin)
const deleteProduct = asyncHandler(async (request, response) => {
  const { productId, imageFilename  } = request.params;

  const { deletedCount } = await Product.deleteOne({ _id: productId });

  if (!deletedCount) {
    response.status(500);
    throw new Error("Something went wrong while deleting the product.");
  } else {
   await cloudinary.uploader.destroy(`kahpeh_bini/${imageFilename}`);

    response.status(204).send();
  }
});

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };