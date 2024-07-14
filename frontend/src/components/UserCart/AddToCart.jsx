import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useFetchData from "../../hooks/useFetchData";
import MyContext from "../../authContext";

const AddToCart = () => {
  const { setCartOrder, setCartOrderCount, cartOrderCount } = useContext(MyContext);
  const { data, error, refetch } = useFetchData(
    "http://localhost:8080/api/v1/products"
  );
  const [cartItems, setCartItems] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(50); // Placeholder for delivery fee
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    if (items !== undefined) {
      if (data) {
        const cartItems = data
          .filter((item) => items.some((filter) => filter._id === item._id))
          .map((item) => {
            const filterItem = items.find((filter) => filter._id === item._id);
            return { ...item, quantity: filterItem.quantity };
          });
        setCartItems(cartItems);
      }
    }
  }, [data]);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity };
      }
      return { ...item };
    });
    setCartItems(updatedCartItems);
    const filterCart = updatedCartItems.map((item) => {
      return { _id: item._id, quantity: item.quantity };
    });
    localStorage.setItem("cart", JSON.stringify(filterCart));
    setCartOrderCount(filterCart.reduce((acc, item) => acc + item.quantity, 0));
  };

  const handleRemoveItem = (index) => {

    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    const filterCart = updatedCartItems.map((item) => {
      return { _id: item._id, quantity: item.quantity };
    });
    localStorage.setItem("cart", JSON.stringify(filterCart));
    setCartOrderCount(filterCart.reduce((acc, item) => acc + item.quantity, 0));
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeSubmit = () => {
    //  promo code logic here soon???
    console.log("Promo code submitted:", promoCode);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee;
  };

  const handleCheckout = () => {
    const orders = cartItems.map((items) => {
      return { productId: items._id, units: items.quantity };
    });
    const cartOrder = {
      orders: orders,
      deliveryFee,
      subTotal: cartItems.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      ),
    };
    setCartOrder(cartOrder);
    navigate(`/checkedout/`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor">
        <div className="mt-32">
          <table className="min-w-full bg-gray-100">
            <thead>
              <tr className="border-2 border-brown-600 bg-coffee">
                <th className="py-2">Items</th>
                <th className="py-2">Title</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
                <th className="py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-2 border-brown-600">
                  <td className="py-2 text-center border-2 border-brown-600">
                    {item.image && (
                      <img
                        src={item.image.path}
                        alt={item.itemName}
                        className="w-16 h-16 object-cover inline-block"
                      />
                    )}
                  </td>
                  <td className="py-2 text-center border-2 border-brown-600">
                    {item.itemName}
                  </td>
                  <td className="py-2 text-center border-2 border-brown-600">
                    PHP {item.unitPrice}
                  </td>
                  <td className="py-2 text-center border-2 border-brown-600">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                      className="w-12 text-center"
                    />
                  </td>
                  <td className="py-2 text-center border-2 border-brown-600">
                    PHP {item.unitPrice * item.quantity}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-8">
          <div className="flex flex-col items-start lg:items-end">
            <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
            <div className="flex justify-between w-full lg:w-auto">
              <span className="font-semibold">Subtotal:</span>
              <span>PHP {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between w-full lg:w-auto">
              <span className="font-semibold">Delivery Fee:</span>
              <span>PHP {deliveryFee}</span>
            </div>
            <div className="flex justify-between w-full lg:w-auto">
              <span className="font-semibold">Total:</span>
              <span>PHP {calculateTotal()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <h2 className="text-xl font-semibold mb-4">
              If you have a promo code, enter it here
            </h2>
            <input
              type="text"
              value={promoCode}
              onChange={handlePromoCodeChange}
              className="border border-gray-300 p-2 rounded w-full lg:w-auto"
              placeholder="Promo code"
            />
            <button
              onClick={handlePromoCodeSubmit}
              className="bg-black text-white py-2 px-4 rounded mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
