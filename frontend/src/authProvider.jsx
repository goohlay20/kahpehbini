import MyContext from "./authContext";
import { useState } from "react";

const myProvider = (response) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user") ? true : false);
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const [cartOrder, setCartOrder] = useState({});
    const [cartOrderCount, setCartOrderCount] = useState(cartItems.reduce((acc, item) => acc + item.quantity, 0));

    const state = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        cartOrder,
        setCartOrder,
        cartOrderCount,
        setCartOrderCount
    };

    return (
        <MyContext.Provider value={state}>{response.children}</MyContext.Provider>
    );
};

export default myProvider;