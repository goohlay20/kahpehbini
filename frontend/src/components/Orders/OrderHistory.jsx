import React, {useState, useEffect} from "react";
import useFetchData from "../../hooks/useFetchData";
import OrderTableCells from "./OrderTableCells";

const OrderHistory = ({ user, handleOrderDetails }) => {
  const { data, error, refetch } = useFetchData(`https://kahpehbini-fgd4zefew-glays-projects.vercel.app/api/v1/orders/user/${user._id}`);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  return (
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 overflow-x-auto">

    <div className="overflow-auto shadow md:block hidden container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <table id="example" className="table-auto border-collapse w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Item Description</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order) => (
              <OrderTableCells
                key={order._id}
                order={order}
                handleOrderDetails={handleOrderDetails}
              />
            ))
          }
        </tbody>
      </table>
    </div>
    {/* for mobile table */}
    <div className="grid grid-cols-1 gap-4 md:hidden">
      <div className="bg-white p-4 rounded-lg shadow">

        <div className=" overflow-auto space-x-2 text-sm">

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order ID
            <div><a href="" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">110298473298</a></div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Total Price
            <div>₱11,234.56</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Item Description
            <div>Arabika, Liberica, Excelsa, Robusta, Arabika, Liberica, Excelsa</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order Date
            <div>06/02/2024</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order Status
            <div>Packed</div>
          </div>

        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">

        <div className=" overflow-auto space-x-2 text-sm">

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order ID
            <div><a href="" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">110298473298</a></div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Total Price
            <div>₱11,234.56</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Item Description
            <div>Arabika, Liberica, Excelsa, Robusta, Arabika, Liberica, Excelsa</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order Date
            <div>06/02/2024</div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2">Order Status
            <div>Packed</div>
          </div>

        </div>
      </div>

    </div>
  </div>
  )
}

export default OrderHistory;