import React, { useState, useEffect } from "react";
import ProductsForm from "./ProductsForm";
import ProductsTable from "./ProductsTable";
import useFetchData from "../../../hooks/useFetchData";
import useDeleteData from "../../../hooks/useDeleteData";
import ErrorMessage from "../../../utility/ErrorMessage";
import SuccessMessage from "../../../utility/SuccessMessage";

const Products = () => {
  const accesstoken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgyNGJiM2E4MDY1NGJiNzk5ZTQ4NDAiLCJpYXQiOjE3MTk4MTUxMDV9.HySIpv9xCD_BMY0KTuUTl3DX33-xMo40R7cFSMLBYGE";
  const { data, error, refetch } = useFetchData(
    "http://localhost:8080/api/v1/products"
  );
  const [deleteData] = useDeleteData();
  const [productDetails, setProductDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("" || error);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEdit = (productId) => {
    setSelectedProduct(productId);
    const product = products.filter((product) => product._id === productId);
    setProductDetails(product[0]);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    const product = products.filter((product) => product._id === productId);
    try {
      await deleteData(
        `http://localhost:8080/api/v1/products/${productId}/${
          product[0].image.filename.split("/")[1]
        }`,
        accesstoken
      );
      setSuccessMessage("Product has been deleted.");
      handleTimeout("success");
    } catch (err) {
      setErrorMessage("An error occurred deleting the product.");
      handleTimeout("error");
    }

    refetch();
  };

  const handleTimeout = (messageType) => {
    setTimeout(() => {
      if (messageType === "success") {
        setSuccessMessage("");
      } else if (messageType === "error") {
        setErrorMessage("");
      }
    }, 3000);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-row">
        <SuccessMessage successMessage={successMessage} />
        <ErrorMessage errorMessage={errorMessage} error={error} />
      </div>
      <button
        onClick={toggleModal}
        className="bg-coffee text-white p-2 rounded hover:bg"
      >
        Add Product
      </button>
      {showModal && (
        <ProductsForm
          products={products}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          accesstoken={accesstoken}
          refetch={refetch}
          handleTimeout={handleTimeout}
          toggleModal={toggleModal}
        />
      )}

      <ProductsTable
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Products;
