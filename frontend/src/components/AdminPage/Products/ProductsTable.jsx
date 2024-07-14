import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductsTable = ({ products, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-gray-100 border-2 border-brown-600">
        <thead>
          <tr className="border-2 border-brown-600 bg-coffee">
            <th className="py-2 px-4 text-center border-brown-600">
              Item Name
            </th>
            <th className="py-2 px-4 text-center border-brown-600">Image</th>
            <th className="py-2 px-4 text-center border-brown-600">
              Unit Price
            </th>
            <th className="py-2 px-4 text-center border-brown-600">
              Stock on Hand
            </th>
            <th className="py-2 px-4 text-center border-brown-600">
              Description
            </th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border border-brown-600 text-center">
                {product.itemName}
              </td>
              <td className="py-2 px-4 border border-brown-600 text-center">
                {product.image && (
                  <div className="flex justify-center">
                    <img
                      src={product.image.path}
                      alt={product.itemName}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                )}
              </td>
              <td className="py-2 px-4 border border-brown-600 text-center">
                {product.unitPrice}
              </td>
              <td className="py-2 px-4 border border-brown-600 text-center">
                {product.stockOnHand}
              </td>
              <td className="py-2 px-4 border border-brown-600 text-center">
                {product.description}
              </td>
              <td className="py-2 px-4 border mt-6 flex justify-center space-x-2 text-center">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
