import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import CustomerOrderTableCells from "./CustomerOrderTableCells";

const CustomerOrders = ({ customerId, toggleOrdersModal, customerName }) => {
  const { data, refetch } = useFetchData(`https://kahpehbini-api.vercel.app/api/v1/orders/user/${customerId}`);
  const [orders, setOrders] = useState([])
  
  useEffect(() =>{
    if(data) {
      setOrders(data);
      console.log(data);
      console.log(customerId);
    }
  },[data, customerId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded">
      <div className="text-center">
        <p className="font-bold">{`${customerName}'s Order History`}</p>
      </div>
      <div className="mt-4">
        <table className="min-w-full bg-gray-100 border-2 border-brown-600">
          <thead>
            <tr className="border-2 border-brown-600">
              <th className="py-2 px-4 border">Order No.</th>
              <th className="py-2 px-4 border">Orders</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Payment Status</th>
              <th className="py-2 px-4 border">Payment Type</th>
              <th className="py-2 px-4 border">Order Status</th>
              <th className="py-2 px-4 border">Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <CustomerOrderTableCells
                key={order._id}
                order={order}
                customerName={customerName}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end space-x-2 mt-3">
        <button
          type="button"
          onClick={toggleOrdersModal}
          className="bg-red-500 text-white p-2 rounded w-1/5"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default CustomerOrders;