import React, { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { format, parseISO } from "date-fns";

const OrderTableCells = ({ order, handleOrderDetails }) => {
  const { data, error, refetch } = useFetchData("https://kahpehbini-api.vercel.app/api/v1/products");
  const [products, setProducts] = useState([]);
  const [orderList, setOrderList ] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (order && products) {
      const formattedOrder = order.orders.map(order => {
        const product = products.find(product => product._id === order.productId);
        return {
          name: product ? product.itemName : 'Unknown Product',
          units: order.units,
        };
      });

      const orderItems = formattedOrder.map((item, index) => {
        if(formattedOrder.length - 1 == index){
          return `${item.name} x ${item.units} `
        } else {
          return `${item.name} x ${item.units}; `
        }
      });

      setOrderList(orderItems);

      if (order.createdAt !== undefined) {      
        const isoOrder = order.createdAt;
        const localOrder = format(parseISO(isoOrder), "MMM dd, yyyy");
        setOrderDate(localOrder);
      }

      const updatedProductArray = order.orders.map(item => {
        const product = products.find(p => p._id === item.productId);
        return {
          ...item,
          productName: product ? product.itemName : 'Unknown Product',
        };
      });
       setOrderProducts(updatedProductArray);
    }
    


  }, [order, products]);


  return (
    <tr>
    <td className="border px-4 py-2">
      {/* <a href="" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"> */}
      <button onClick={()=>handleOrderDetails(order, orderProducts)}>
        {`${order._id.slice(0, 5)}...${order._id.slice(-5)}`}
      </button>
      {/* </a> */}
    </td>
    <td className="border px-4 py-2">{orderList}</td>
    <td className="border px-4 py-2">{order.subTotal + order.deliveryFee}</td>
    <td className="border px-4 py-2">{orderDate}</td>
    <td className="border px-4 py-2">{order.orderStatus}</td>
  </tr>
  )
}

export default OrderTableCells;