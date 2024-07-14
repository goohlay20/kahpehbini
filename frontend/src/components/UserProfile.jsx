import { useContext, useState } from "react";
import MyContext from "../authContext";
// import Moment from "react-moment";
import UserProfileForm from "./UserProfileForm";
import OrderHistory from "./Orders/OrderHistory";
import OrderDetails from "./Orders/OrderDetails";

const UserProfile = () => {
  const { user } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState("")
  const [orderProducts, setorderProducts] = useState("")

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOrderDetails = (selectedOrder, items) => {
    setShowModal(true);
    setOrder(selectedOrder);
    setorderProducts(items);
  }

  return (
    <>
      <div className="flex-col">
        <div className="p-6 bg-yellow-50 flex items-center justify-center">
          <div className="container max-w-screen-lg mt-24 mx-auto">
            <UserProfileForm
              user={user}
            />
          </div>
        </div>
        <div className="p-6 bg-yellow-50 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">Order History</h2>
              <p className="text-gray-500 mb-6"></p>
              <OrderHistory
                user={user}
                handleOrderDetails={handleOrderDetails}
              />
            </div>
          </div>
        </div>
        { showModal && 
          <OrderDetails
            order={order}
            orderProducts={orderProducts}
            toggleModal={toggleModal}
          />
        }
      </div>
    </>
  );
}

export default UserProfile;