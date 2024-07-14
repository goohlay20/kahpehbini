import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Menu from "./components/Menu";
import About from "./components/About";
import HomeProduct from "./components/HomeProduct";
import Review from "./components/Review";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import AdminPage from "./components/AdminPage/AdminPage";
import AddToCart from "./components/UserCart/AddToCart";
import CheckedOut from "./components/UserCart/CheckedOut";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div id="/home">
                <Home />
              </div>

              <div id="/products">
                <HomeProduct />
              </div>
              {/* 
              <div id="/menu">
                <Menu />
              </div> */}

              <div id="/about">
                <About />
              </div>

              <div id="/review">
                <Review />
              </div>
            </main>
          }
        />
        <Route
          path="/signin"
          element={
            <main>
              <SignIn />
            </main>
          }
        />
        <Route
          path="/signup"
          element={
            <main>
              <SignUp />
            </main>
          }
        />
        <Route
          path="/profile"
          element={
            <main>
              <UserProfile />
            </main>
          }
        />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/checkedout" element={<CheckedOut />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

const MainContent = () => (
  <>
    <Navbar />
    <main>
      <div id="home">
        <Home />
      </div>
      <div id="products">
        <HomeProduct />
      </div>
      <div id="menu">
        <Menu />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="review">
        <Review />
      </div>
    </main>
    <Footer />
  </>
);

export default App;
