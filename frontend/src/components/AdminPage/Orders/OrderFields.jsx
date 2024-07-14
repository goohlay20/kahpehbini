import React from "react";
import { format } from "date-fns"

const OrderFields = ({ currentOrder, handleInputChange, customerName, currentOrderNo }) => {
  const deliveryDate = Date.now(currentOrder.createdAt);
  const formattedDate = format(deliveryDate, "yyyy-MM-dd'T'HH:mm");
  
  return (
    <>
      <div className="mb-4">
        <input
          type= "text"
          name="customer"
          value={currentOrder._id}
          className="border p-1 w-full text-center"
          disabled
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium">
          Delivery Date
        </label>
        <input
          type= "datetime-local"
          name="deliveryDate"
          value={currentOrder.deliveryDate !== undefined ? format(new Date(currentOrder.deliveryDate), "yyyy-MM-dd'T'HH:mm") : ""}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">
          Order Status
        </label>
        <select
          name="orderStatus"
          value={currentOrder.orderStatus}
          onChange={handleInputChange}
          className="border p-1 w-full"
        >
          <option value="To pack">To pack</option>
          <option value="To ship">To ship</option>
          <option value="On going delivery">
            On going delivery
          </option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block font-medium">
          Payment Date
        </label>
        <input
          type= "datetime-local"
          name="paymentDate"
          value={currentOrder.paymentDate !== undefined ? format(new Date(currentOrder.paymentDate), "yyyy-MM-dd'T'HH:mm") : ""}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium">
          Payment Status
        </label>
        <select
          name="paymentStatus"
          value={currentOrder.paymentStatus}
          onChange={handleInputChange}
          className="border p-1 w-full"
        >
          <option value="Pending Payment">
            Pending Payment
          </option>
          <option value="Confirmed Payment">
            Confirmed Payment
          </option>
        </select>
      </div>

      {/* <div className="mb-2" key={key}>
        <label className="block">
          Invoice
        </label>
        <input
          type={field.type}
          name={key}
          onChange={handleFileChange}
          className="border p-1 w-full"
        />
      </div> */}

    </>
  )
}

export default OrderFields;