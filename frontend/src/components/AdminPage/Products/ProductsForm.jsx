import React, { useState} from "react";
import ProductFields from "./ProductsFields";
import { requiredValidation, imageValidation, currencyValidation, minLengthValidation } from "../../../utility/fieldValidation";
import { useForm } from "react-hook-form";
import useUpdateData from "../../../hooks/useUpdateData";
import useAddData from "../../../hooks/useAddData";

const ProductsForm = ({  products, productDetails, setProductDetails, selectedProduct, setSelectedProduct, setSuccessMessage, setErrorMessage, accesstoken, refetch, handleTimeout, toggleModal  }) => {
  const [ updateProduct ] = useUpdateData();
  const [ addProduct ] = useAddData();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({ defaultValues: productDetails });
  const [imageFile, setImageFile] = useState("");

  const productFields = [
    {label: "Item Name", type: "text", name: "itemName", validation: minLengthValidation},
    {label: "Unit Price", type: "text", name: "unitPrice", validation: currencyValidation},
    {label: "Stock on Hand", type: "number", name: "stockOnHand", validation: requiredValidation},
    {label: "Description", type: "text", name: "description", validation: requiredValidation},
    {label: "Image", type: "file", name: "image", validation: imageValidation},
  ];

  const handleInputChange = (e, fieldName) => {
    if (fieldName === "image"){
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductDetails(prevData => ({
            ...prevData,
            image: {
              path: reader.result,
            },
        }));
        };
        reader.readAsDataURL(file);
      } else {
        setProductDetails(prevData => ({
          ...prevData,
          image: {
          },
      }));
      }
    } else {
      const value = e.target.value;
      setProductDetails(prevData => ({
      ...prevData, [fieldName]:value
    }));
    }
  };

  const onSubmit = async(input, e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("itemName", input.itemName);  
    data.append("unitPrice", input.unitPrice);
    data.append("stockOnHand", input.stockOnHand);
    data.append("description", input.description);
    if (imageFile) {
      data.append("product-image", imageFile);
    }

    // Update product details
    if (selectedProduct !== null) {
      if(productDetails !== products.filter(product => product._id === selectedProduct)[0]){
       try {
          await updateProduct(`http://localhost:8080/api/v1/products/${selectedProduct}`, data, accesstoken);
          setSuccessMessage("Updated successfully.");
          handleTimeout("success");
        } catch (err) {
          setErrorMessage('An error occurred updating the product.');
          handleTimeout("error");
        }
      }
    // Add new Product
    } else {
      try {
        await addProduct("http://localhost:8080/api/v1/products", data, accesstoken);
        setSuccessMessage("New product has been added.");
        handleTimeout("success");
      } catch (err) {
        setErrorMessage('An error occurred adding the product.');
        handleTimeout("error");
      }
    }
    clearData();
    refetch();
    toggleModal();
  };

  const clearData = () => {
    setProductDetails({});
    setSelectedProduct(null);
    setImageFile("");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded">
      <h3 className="text-lg font-semibold mb-1">{selectedProduct !== null ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        { 
          productFields.map((field)=> (
            <ProductFields 
              key={field.name}
              field={field}
              productDetails={productDetails}
              handleInputChange={handleInputChange}
              errors={errors}
              register={register}
              trigger={trigger}
              setProductDetails={setProductDetails}
            />
          ))
        }
        <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={()=>{
            toggleModal()
            reset()
            clearData()
          }}
          className="mx-1 bg-red-500 text-white p-2 rounded w-1/2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="mx-1 bg-green-500 text-white p-2 rounded w-1/2"
        >
          Save
        </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ProductsForm;