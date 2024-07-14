import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format, parseISO } from "date-fns";

const CustomerTableCells = ({ customer, handleEdit, handleDelete, handleViewOrders }) => {
  const [createdAt, setCreatedAt] = useState("");

  useEffect(()=> {
    if(customer){
      if (customer.createdAt !== undefined) {      
        const isocreatedAt = customer.createdAt;
        const localCreatedAt = format(parseISO(isocreatedAt), "MMM dd, yyyy");
        setCreatedAt(localCreatedAt);
      }
    }
  }, [customer]);

  return (
    <tr>
      <td className="py-2 px-4 border border-brown-600">
        {customer.email}
      </td>
      <td className="py-2 px-4 border border-brown-600">
        {createdAt}
      </td>
      <td className="py-2 px-4 border border-brown-600">
        {`${customer.fullname?.firstName} ${customer.fullname?.lastName}`}
      </td>
      {/* <td className="py-2 px-4 border border-brown-600">
        {customer.fullname?.lastName}
      </td> */}
      <td className="py-2 px-4 border border-brown-600">
        {[
          customer.address?.address,
          customer.address?.barangay,
          customer.address?.city,
          customer.address?.province,
        ].filter(part => part).join(', ')}
      </td>
      {/* <td className="py-2 px-4 border border-brown-600">
        {customer.address?.zipcode}
      </td> */}
      <td className="py-2 px-4 border border-brown-600">
        <button 
          onClick={()=>handleViewOrders(customer._id, customer.fullname?.firstName, customer.fullname?.lastName)}
          className="bg-[#03a9f4] text-white p-1 rounded w-full"
        >
          View
        </button>
      </td>
      <td className="py-2 px-4 border border-brown-600">
        {customer.billing}
      </td>
      {/* <td className="py-2 px-4 border border-brown-600">
        {customer.subscriptionStatus}
      </td> */}
      <td className="py-2 px-4 border border-brown-600">
        {customer.role}
      </td>
      <td className="py-2 px-4 border flex space-x-2 align-center">
        <button
          onClick={() => handleEdit(customer._id)}
          className="text-blue-500"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(customer._id)}
          className="text-red-500"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default CustomerTableCells;