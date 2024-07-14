import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";


const OrderDetails = ({ order, toggleModal, orderProducts }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    if(order) {
      if (order.createdAt !== undefined) {      
        const isoOrder = order.createdAt;
        const localOrder = format(parseISO(isoOrder), "MMM dd, yyyy");
        setDate(localOrder);
      }
      console.log(order);
    } 
  }, [order]);

useEffect(()=> {
  if(orderProducts){
    console.log(orderProducts)
  }
}, [orderProducts]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded">
      <div className="text-center">
        {/* <p className="font-bold">{`Order No.: ${order._id}`}</p> */}
        <p className="font-bold text-lg">Kahpeh Bini</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700 ml-3">
            <div>Date: {date}</div>
            <div>Invoice #: INV12345</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Bill To:</h2> 
          <div className="text-gray-700 mb-1">John Doe</div>
          <div className="text-gray-700 mb-1">123 Main St.</div> 
          <div className="text-gray-700 mb-1">Anytown, USA 12345</div> 
          <div className="text-gray-700">johndoe@example.com</div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text gray-700 mx-1">
                Product
              </th>
              <th className="text-center font-bold text gray-700 mx-1">
                Price
              </th>
              <th className="text-center font-bold text gray-700 mx-1">
                Units
              </th>
              <th className="text-right font-bold text gray-700 mx-1">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {/* { orderProducts.map((item) => (
                <tr key={item.name}>
                <td className="text-left text-gray-700">
                  item.productName
                </td>
                <td className="text-center text-gray-700">
                  Units
                </td>
                <td className="textcenter text-gray-700">
                  Product1
                </td>
                <td className="text-right text-gray-700">
                  $100.00
                </td>
              </tr>
            ))

            } */}
 
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">
                Total
              </td>
              <td className="text-right font-bold text-gray-700">
                $300.00
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2">
          Thank you for your business!
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-3">
        <button
          type="button"
          onClick={toggleModal}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default OrderDetails;