import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import useFetchData from "../../../hooks/useFetchData";

const OrderTableCells = ({ order, handleEdit, handleDelete }) => {
  const [deliveryD, setdeliveryD] = useState("");
  const [purchaseD, setPurchaseD] = useState("");
  const [paymentD, setPaymentD] = useState("");
  const [formattedOrderNo, setFormattedOrderNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [formattedOrder, setFormattedOrder] = useState("");
  const [products, setProducts] = useState([]);
  const { data: userList, error: userError, refetch: userRefetch } = useFetchData(
    "https://kahpehbini-fgd4zefew-glays-projects.vercel.app/api/v1/users"
  );
  const { data: productList, error: productError, refetch: productRefetch } = useFetchData(
    "https://kahpehbini-fgd4zefew-glays-projects.vercel.app/api/v1/products"
  );

  useEffect(()=> {
    // Fetch customer name
    if(userList && order){
      const user = userList.find(user => user._id === order.userId);
       if(user){
         setCustomerName(`${user.fullname?.firstName} ${user.fullname?.lastName}`);
        }
    }
    
    if (order && products) {
      // Format Order List by Product Name x Units
      const formattedOrder = order.orders.map(order => {
        const product = products.find(product => product._id === order.productId);
        return {
          name: product ? product.itemName : 'Unknown Product',
          units: order.units,
        };
      });
    
      const orders = formattedOrder.map((item, index) => {
        if(formattedOrder.length - 1 == index){
          return `${item.name} x ${item.units} `
        } else {
          return `${item.name} x ${item.units}; `
        }
      });
      setFormattedOrder(orders);

      // Format Dates (Delivery, Purchase, Payment)
      if (order.deliveryDate !== undefined) {
        const isoDelivery = order.deliveryDate;
        const localDelivery = format(parseISO(isoDelivery), "MMM dd, yyyy");
        setdeliveryD(localDelivery);
      } 

      if (order.createdAt !== undefined) {      
        const isoPurchase = order.createdAt;
        console.log(isoPurchase);
        const localPurchase = format(parseISO(isoPurchase), "MMM dd, yyyy");
        setPurchaseD(localPurchase);
      }

      if (order.paymentDate !== undefined) {
        const isoPayment = order.paymentDate;
        const localPayment = format(parseISO(isoPayment), "MMM dd, yyyy");
        setPaymentD(localPayment);
      }

      // Format Order No. 
      const formatNo = `${order._id.slice(0, 5)}...${order._id.slice(-5)}`; 
      setFormattedOrderNo(formatNo);
    }
  }, [userList, order, products,]);

  // Fetch products
  useEffect(() => {
    if (productList) {
      setProducts(productList);
    }
  }, [productList]);

  return (
    <tr>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {formattedOrderNo}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {customerName}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {purchaseD}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {deliveryD}
      </td>
      {/* <td className="py-2 px-2 border border-brown-600 text-center">
        {order.itemName}
      </td> */}
      <td className="py-2 px-2 border border-brown-600 text-center">
        {formattedOrder}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.subTotal}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.deliveryFee}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.deliveryFee + order.subTotal}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.orderStatus}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.paymentType}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.paymentStatus}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {paymentD}
      </td>
      <td className="py-2 px-2 border border-brown-600 text-center">
        {order.invoice && (
          <a href={URL.createObjectURL(order.invoice)} download>
            Download Invoice
          </a>
        )}
      </td>
      <td className="py-2 px-2 text-center flex justify-center">
        <button
          onClick={() => handleEdit(order._id, customerName.split(" ")[0], formattedOrderNo)}
          className="text-blue-500 mx-2"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(order._id)}
          className="text-red-500 mx-2"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default OrderTableCells;