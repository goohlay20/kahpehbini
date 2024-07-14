import React, { useContext, useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import useUpdateData from "../../../hooks/useUpdateData";
import MyContext from "../../../authContext";

const CustomerForm = ({ customerId, setShowModal, toggleModal, setErrorMessage, setSuccessMessage, refetch }) => {
  const { data } = useFetchData(`https://kahpehbini-api.vercel.app/api/v1/users/`);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [role, setRole] = useState("");
  const [updateRole] = useUpdateData();
  const { user } = useContext(MyContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const updatedRole = {
      role,
    };

    try {
      await updateRole(`https://kahpehbini-api.vercel.app/api/v1/users/${customerId}`, updatedRole, user.accessToken);
      setSuccessMessage("Updated successfully.");
      handleTimeout("success");
      refetch();
    } catch (err) {
      setErrorMessage('An error occurred updating the order.');
      handleTimeout("error");
    }

    setShowModal(false);
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

  useEffect(() => {
    if(data){
      const customer = data.find((user) => user._id === customerId);
      setRole(customer.role);
      setSelectedCustomer(customer);
    }
  }, [data, customerId]);

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded">
      <h3>{customerId !== null ? `Change ${selectedCustomer.fullname?.firstName}'s role?` : "Add Customer"}</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="mb-2 mt-2">
          <select
            name="orderStatus"
            value={role}
            onChange={(e)=> setRole(e.target.value)}
            className="border p-1 w-full"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-red-500 text-white p-2 rounded w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded w-1/2"
            >
              Save
            </button>
          </div>
      </form>
    </div>
  </div>
  )
}

export default CustomerForm;