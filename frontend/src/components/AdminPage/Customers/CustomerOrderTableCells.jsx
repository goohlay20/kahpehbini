import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import useFetchData from "../../../hooks/useFetchData";

const CustomerOrderTableCells = ({ order }) => {
  const [deliveryD, setdeliveryD] = useState("");
  const [purchaseD, setPurchaseD] = useState("");
  const [paymentD, setPaymentD] = useState("");
  const [formattedOrderNo, setFormattedOrderNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [formattedOrder, setFormattedOrder] = useState("");
  const [products, setProducts] = useState([]);
  const { data: userList, error: userError, refetch: userRefetch } = useFetchData(
    "https://kahpehbini-api.vercel.app/api/v1/users"
  );
  const { data: productList, error: productError, refetch: productRefetch } = useFetchData(
    "https://kahpehbini-api.vercel.app/api/v1/products"
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

  
  return(
    <tr>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {formattedOrderNo}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {formattedOrder}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {order.deliveryFee + order.subTotal}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {order.paymentStatus}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {order.paymentType}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {order.orderStatus}
    </td>
    <td className="py-2 px-2 border border-brown-600 text-center">
      {deliveryD}
    </td>
  </tr>
  )
}

export default CustomerOrderTableCells;