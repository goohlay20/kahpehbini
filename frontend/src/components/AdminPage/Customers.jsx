import React, { useState, useEffect, useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
import CustomerTableCells from "./Customers/CustomerTableCells";
import CustomerForm from "./Customers/CustomerForm";
import SuccessMessage from "../../utility/SuccessMessage";
import ErrorMessage from "../../utility/ErrorMessage";
import WarningMessage from "../../utility/WarningMessage";
import useUpdateData from "../../hooks/useUpdateData";
import MyContext from "../../authContext";
import CustomerOrders from "./Customers/CustomerOrders";

function Customers() {
  const { data, error, refetch } = useFetchData("https://kahpehbini-api.vercel.app/api/v1/users");
  const [updateData] = useUpdateData();
  const { user } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const [ordersModal, setOrdersModal] =useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [customerName, setCustomerName] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleOrdersModal = () => {
    setOrdersModal(!ordersModal);
  };

  const handleEdit = (customerId) => {
    setCustomerId(customerId);
    setShowModal(true);
  };

  const handleViewOrders = (customerId, fname, lname) => {
    setCustomerId(customerId);
    setOrdersModal(true);
    setCustomerName(`${fname} ${lname}`);
  };

  const handleTimeout = (messageType) => {
    setTimeout(() => {
      if (messageType === "success") {
        setSuccessMessage("");
      } else if (messageType === "error") {
        setErrorMessage("");
      } else if (messageType === "warning") {
        setWarningMessage("");
      } 
    }, 3000);
  };

  const handleDelete = async(customerId) => {
    try {
      const data = {
        isDeleted: true,
      };

      await updateData(
        `https://kahpehbini-fgd4zefew-glays-projects.vercel.app/api/v1/users/${customerId}`, data,
        user.accessToken
      );
      setWarningMessage("User has been deleted.");
      handleTimeout("warning");
    } catch (err) {
      setErrorMessage("An error occurred deleting the order.");
      handleTimeout("error");
    }

    refetch();
  };

  useEffect(() => {
    if(data){
      setCustomers(data);
    }
  }, [data])
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(customers.length / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-28 overflow-x-auto">
      <div className="flex flex-row">
        <WarningMessage warningMessage={warningMessage} />
        <SuccessMessage successMessage={successMessage} />
        <ErrorMessage errorMessage={errorMessage} error={error} />
      </div>

      {/* <button
        onClick={toggleModal}
        className="bg-coffee text-white p-2 rounded"
      >
        Add Customer
      </button> */}

      {showModal && (
        <CustomerForm 
          customerId={customerId}
          setShowModal={setShowModal}
          toggleModal={toggleModal}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          refetch={refetch}
        />
      )}

      {ordersModal &&(
        <CustomerOrders
        customerId={customerId}
        toggleOrdersModal={toggleOrdersModal}
        customerName={customerName}
        />
      )

      }
      <div className="mt-4">
        <table className="min-w-full bg-gray-100 border-2 border-brown-600">
          <thead>
            <tr className="border-2 border-brown-600">
              {/* <th className="py-2 px-4 border">Username</th> */}
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Date Created</th>
              <th className="py-2 px-4 border">Full Name</th>
              {/* <th className="py-2 px-4 border">Last Name</th> */}
              <th className="py-2 px-4 border">Address</th>
              {/* <th className="py-2 px-4 border">Zipcode</th> */}
              <th className="py-2 px-4 border">Order History</th>
              <th className="py-2 px-4 border">Billing</th>
              {/* <th className="py-2 px-4 border">Subscription Status</th> */}
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.filter((customer)=> customer.role === "customer").map((customer, index) => (
            // {currentCustomers.map((customer) => (
              <CustomerTableCells
                key={customer._id}
                customer={customer}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleViewOrders={handleViewOrders}
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
    </div>
  );
}

export default Customers;
