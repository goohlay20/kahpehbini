import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    itemName: "",
    unitPrice: "",
    stockOnHand: "",
    description: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setEditIndex(null);
    } else {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
    setNewProduct({
      itemName: "",
      unitPrice: "",
      stockOnHand: "",
      description: "",
      image: "",
    });
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewProduct(products[index]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div>
      <h2>Products</h2>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Product
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <h3>{editIndex !== null ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={newProduct.itemName}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={newProduct.unitPrice}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Stock on Hand</label>
                <input
                  type="number"
                  name="stockOnHand"
                  value={newProduct.stockOnHand}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="border p-1 w-full"
                />
                {newProduct.image && (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover mt-2"
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="ml-2 bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Item Name</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Unit Price</th>
              <th className="py-2 px-4 border">Stock on Hand</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{product.itemName}</td>
                <td className="py-2 px-4 border">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.itemName}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border">{product.unitPrice}</td>
                <td className="py-2 px-4 border">{product.stockOnHand}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
