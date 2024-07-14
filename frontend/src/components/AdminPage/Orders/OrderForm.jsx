import React, { useContext } from "react";
import OrderFields from "./OrderFields";
import useUpdateData from "../../../hooks/useUpdateData";
import MyContext from "../../../authContext";

const OrderForm = ({ setCurrentOrder, currentOrder, editIndex, setShowModal, toggleModal, customerName, refetch, setErrorMessage, setSuccessMessage, handleTimeout, currentOrderNo }) => {
  const { user } = useContext(MyContext);
  const [ updateOrder ] = useUpdateData();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder({
      ...currentOrder,
      [name]: value,
    });
    console.log(name, value);
  };

  // const handleFileChange = (e) => {
  //   setCurrentOrder({
  //     ...currentOrder,
  //     invoice: e.target.files[0],
  //   });
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await updateOrder(`https://kahpehbini-api.vercel.app/api/v1/orders/${currentOrder._id}`, currentOrder, user.accessToken);
      setSuccessMessage("Updated successfully.");
      handleTimeout("success");
    } catch (err) {
      setErrorMessage('An error occurred updating the order.');
      handleTimeout("error");
    }

    setShowModal(false);
    refetch();
  };

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h3 className="text-lg font-semibold mb-1">
          {editIndex !== null ? `${customerName}'s Order` : "Add Order"}
        </h3>
        <form onSubmit={handleSubmit}>
            <OrderFields
              currentOrder={currentOrder}
              handleInputChange={handleInputChange}
              customerName={customerName}
              currentOrderNo={currentOrderNo}
            />
          <div className="flex justify-end space-x-2 mt-4">
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

export default OrderForm;