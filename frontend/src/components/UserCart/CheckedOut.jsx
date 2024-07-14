import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import bpi from "./bpi.JPG";
import unionbank from "./unionbank.JPG";
import gcash from "./gcash.JPG";
import maya from "./maya.JPG";
import useAddData from "../../hooks/useAddData";
import MyContext from "../../authContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requiredValidation } from "../../utility/fieldValidation";
import ErrorMessage from "../../utility/ErrorMessage";

const CheckedOut = () => {
  const [addData] = useAddData();
  const [checkoutDetails, setCheckoutDetails] = useState({});
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({ defaultValues: checkoutDetails});
  const { cartOrder, setCartOrder, user, setCartOrderCount } = useContext(MyContext);
  const [paymentType, setPaymentType] = useState("BPI");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const qrImages = {
    BPI: bpi,
    Unionbank: unionbank,
    GCash: gcash,
    Maya: maya,
  };

  useEffect(() => {
    if (cartOrder !== undefined) {
      setCheckoutDetails({
        paymentType: "BPI",
        paymentReference: "",
        totalPayment: cartOrder.subTotal + cartOrder.deliveryFee,
      });
    }
  }, [cartOrder]);

  const handleInputChange = (e, fieldName) => {
    if (fieldName === "paymentType"){
      setPaymentType(e.target.value);
    }

    const value = e.target.value;
    setCheckoutDetails(prevData => ({
    ...prevData, [fieldName]:value
  }));
  };

  const onSubmit = async (input) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const newOrder = {
      ...cartOrder,
      items: cartItems,
      orderStatus: "processing",
      paymentType: input.paymentType.toLowerCase(),
      paymentStatus: "pending",
    };

    try {
      const savedOrder = await addData(
        "http://localhost:8080/api/v1/orders",
        newOrder,
        user.accessToken
      );
      const paymentDetails = {
        orderId: savedOrder._id,
        total: checkoutDetails.totalPayment,
        type: savedOrder.paymentType,
        referenceNo: input.paymentReference,
        status: savedOrder.orderStatus,
      };

      try {
        await addData(
          "http://localhost:8080/api/v1/payments",
          paymentDetails,
          user.accessToken
        );
        localStorage.removeItem("cart");
        setCartOrder({});
        setCartOrderCount(0);
        setShowModal(true);
        reset();
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 bg-backgroundColor relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex justify-start mb-5 mt-20 lg:mr-20">
              <button
                onClick={() => navigate("/cart")}
                className="hover:bg-gray-200 font-bold py-2 px-4 rounded"
              >
                ⬅️ Back to Cart
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Payment Details
            </h2>
            <label className="mb-2 w-full text-left">Total Amount</label>
            <input
              type="text"
              defaultValue={checkoutDetails.totalPayment || ""}
              readOnly
              placeholder="Total Payment Amount"
              className="border border-gray-300 p-2 rounded mb-4 w-full opacity-50"
            />
            <label className="mb-2 w-full text-left">
              Enter Payment Reference Number
            </label>
            <input
              type="text"
              name="paymentRefence"
              defaultValue={checkoutDetails.paymentReference || ""}
              //onChange={handleReferenceChange}
              placeholder="Payment Reference Number"
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              aria-invalid={errors.paymentReference ? "true" : "false"}
              {...register("paymentReference", requiredValidation("paymentReference", handleInputChange, trigger))}
            />
            {errors.paymentReference &&
              <ErrorMessage errorMessage={errors.paymentReference?.message} />
            } 

            <label className="mb-2 w-full text-left">
              Select Mode of Payment
            </label>
            <select
              defaultValue={checkoutDetails.paymentType || ""}
              //onChange={handlePaymentTypeChange}
              name="paymentType"
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              {...register("paymentType", requiredValidation("paymentType", handleInputChange, trigger))}
            >
              <option value="BPI">BPI</option>
              <option value="Unionbank">Unionbank</option>
              <option value="GCash">GCash</option>
              <option value="Maya">Maya</option>
            </select>
            {errors.paymentType &&
              <ErrorMessage errorMessage={errors.paymentType?.message} />
            } 
            <button
              //onClick={handleConfirmPayment}
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded self-center"
            >
              Confirm Payment
            </button>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={qrImages[paymentType]}
              alt={`${paymentType} QR`}
              className="w-72 h-72 lg:w-96 lg:h-96 object-scale-down mt-20"
            />
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">
                Thanks for your order!
              </h2>
              <p>Seller will reach out to you for the delivery details.</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/profile");
                }}
                className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckedOut;
