import React, { useState, useEffect, useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
import OrderForm from "./Orders/OrderForm";
import OrderTableCells from "./Orders/OrderTableCells";
import SuccessMessage from "../../utility/SuccessMessage";
import ErrorMessage from "../../utility/ErrorMessage";
import WarningMessage from "../../utility/WarningMessage";
import useUpdateData from "../../hooks/useUpdateData";
import MyContext from "../../authContext";

function Orders() {
  const { data, error, refetch } = useFetchData(
    "https://kahpehbini-api.vercel.app/api/v1/orders"
  );
  const { user } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [updateData] = useUpdateData();
  const [customerName, setCustomerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [currentOrderNo, setCurrentOrderNo] = useState("");

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEdit = (orderId, name, formattedOrderNo) => {
    setEditIndex(orderId);
    const order = orders.filter((order) => order._id === orderId);
    setCurrentOrder(order[0]);
    setCustomerName(name);
    setCurrentOrderNo(formattedOrderNo)
    setShowModal(true);
  };

  const handleDelete = async(orderId) => {
    try {
      const data = {
        isDeleted: true,
      };

      await updateData(
        `https://kahpehbini-api.vercel.app/api/v1/orders/${orderId}`, data,
        user.accessToken
      );
      setWarningMessage("Order has been deleted.");
      handleTimeout("warning");
    } catch (err) {
      setErrorMessage("An error occurred deleting the order.");
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
      } else if (messageType === "warning"){
        setWarningMessage("");
      }
    }, 3000);
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-28 overflow-x-auto">
      <div className="flex flex-row">
        <SuccessMessage successMessage={successMessage} />
        <ErrorMessage errorMessage={errorMessage} error={error} />
        <WarningMessage warningMessage={warningMessage} error={error} />
      </div>
      {/* <button
        onClick={toggleModal}
        className="bg-coffee text-white p-2 rounded"
      >
        Add Order
      </button> */}
      {showModal && (
        <OrderForm 
          orders={orders}
          setCurrentOrder={setCurrentOrder}
          currentOrder={currentOrder}
          editIndex={editIndex}
          setOrders={setOrders}
          setEditIndex={setEditIndex}
          setShowModal={setShowModal}
          toggleModal={toggleModal}
          customerName={customerName}
          refetch={refetch}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          handleTimeout={handleTimeout}
          currentOrderNo={currentOrderNo}
        />
      )}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-gray-100 border-2 border-brown-600">
          <thead>
            <tr className="border-2 border-brown-600">
              <th className="py-2 px-2 text-center">Order No.</th>
              <th className="py-2 px-2 text-center">Name</th>
              <th className="py-2 px-2 text-cente">Purchase Date</th>
              <th className="py-2 px-2 text-center">Delivery Date</th>
              <th className="py-2 px-2 text-center">Items</th>
              <th className="py-2 px-2 text-center">Sub-total</th>
              <th className="py-2 px-2 text-center">Delivery Fee</th>
              <th className="py-2 px-2 text-center">Total Price</th>
              <th className="py-2 px-2 text-center">Order Status</th>
              <th className="py-2 px-2 text-center">Payment Type</th>
              <th className="py-2 px-2 text-center">Payment Status</th>
              <th className="py-2 px-2 text-center">Payment Date</th>
              <th className="py-2 px-2 text-center">Invoice</th>
              <th className="py-2 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.sort((a, b) => b.createdAt - a.createdAt).map((order) => (
              <OrderTableCells
                key={order._id}
                order={order}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
    </div>
  );
}

export default Orders;
