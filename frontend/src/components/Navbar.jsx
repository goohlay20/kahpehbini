import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
// import { SiCoffeescript } from "react-icons/si";
import img from "../assets/img/Kahpeh_Bini_logo2.png"
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import MyContext from "../authContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, setIsLoggedIn, cartOrder, cartOrderCount, setUser } = useContext(MyContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // const [cartCount, setCartCount] = useState(cartOrder.length);

  // useEffect(() => {
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCartCount(cartItems.length);
  // }, []);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleNavigationClick = () => {
    if (location.pathname === "/signin" || location.pathname === "/profile" || location.pathname.startsWith("/admin/") || location.pathname.startsWith("/cart")) {
      navigate("/");
    }
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/signin");
    setUser({});
  };

  return (
    <div className="fixed w-full z-10">
      <div>
        <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer gap-2">
            <RouterLink to="/"><img src={img} alt="Kah-peh Binis Logo" className="h-16"/></RouterLink>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <ScrollLink
              to="/home"
              spy={true}
              smooth={true}
              duration={500}
              onClick={handleNavigationClick}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink>

            <ScrollLink
              to="/products"
              spy={true}
              smooth={true}
              duration={500}
              onClick={handleNavigationClick}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Our Kah-peh Bin(i)s
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink>

            {/* <ScrollLink
              to="/menu"
              spy={true}
              smooth={true}
              duration={500}
              onClick={handleNavigationClick}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Subscriptions
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink> */}

            <ScrollLink
              to="/about"
              spy={true}
              smooth={true}
              duration={500}
              onClick={handleNavigationClick}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              The Bin(i)s
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink>

            <ScrollLink
              to="/review"
              spy={true}
              smooth={true}
              duration={500}
              onClick={handleNavigationClick}
              className="group relative inline-block cursor-pointer hover:text-brightColor"
            >
              Reviews
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </ScrollLink>
          </nav>

          {/* <div className="lg:flex">
          <div className="hidden lg:flex"> */}

            <div className="flex items-center gap-4">

            
          <div className="lg:flex">
          {user.role === undefined ? "" :  user.role === "customer" ? 
                        <> 
                        <RouterLink
                        to="/cart"
                        className="text-xl  hover:text-brightColor relative"
                      >
                        <img src="./src/assets/img/icons8-cart-90.png" className="h-8 w-8 mr-4" />
                        {cartOrderCount > 0 && (
                          <span className="absolute top-0 left-5 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                            {cartOrderCount}
                          </span>
                        )}
                      </RouterLink>

          <RouterLink to="/profile"><img src="./src/assets/img/icon-admin.png" className="h-8 w-8 mr-4" /></RouterLink></> : 
          <RouterLink to="/admin/*" className="underline hover:text-yellow-50"> <img src="../../src/assets/img/icon-admin.png" className="h-8 w-8 mr-4" /></RouterLink>}
            {user.role === undefined ?
              <Button title="Login" onClick={handleLoginClick} />
           : 
              <Button title="Logout" onClick={handleLogoutClick} /> 
          }
        </div>

        <div className="lg:hidden flex flex-row justify-end">
          {menu ? (
            <AiOutlineClose size={25} onClick={closeMenu} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
          )}
        </div>
      </div>

      {menu && (
        <div className="lg:hidden flex flex-col justify-center items-center text-lg font-medium gap-8 p-5 bg-gradient-to-r from-backgroundColor to-brightColor shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <ScrollLink to="/home" spy={true} smooth={true} duration={500} onClick={handleNavigationClick} className="group relative inline-block cursor-pointer hover:text-brightColor">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>

          <ScrollLink to="/products" spy={true} smooth={true} duration={500} onClick={handleNavigationClick} className="group relative inline-block cursor-pointer hover:text-brightColor">
            Products
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>

          {/* <ScrollLink to="/menu" spy={true} smooth={true} duration={500} onClick={handleNavigationClick} className="group relative inline-block cursor-pointer hover:text-brightColor">
            Subscriptions
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink> */}

          <ScrollLink to="/review" spy={true} smooth={true} duration={500} onClick={handleNavigationClick} className="group relative inline-block cursor-pointer hover:text-brightColor">
            Reviews
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>

          <ScrollLink to="/about" spy={true} smooth={true} duration={500} onClick={handleNavigationClick} className="group relative inline-block cursor-pointer hover:text-brightColor">
            About Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </ScrollLink>

          {user ? (
            <RouterLink to="/profile" spy={true} smooth={true} duration={500} className="mr-5">
              <h2 className="text-blue-gray-800 hover:underline hover:text-blue-500">Hi {user.username}!</h2>
            </RouterLink>
          ) : (
            <div className="mr-5"></div>
          )}

          <div className="lg:flex">
            {user ? (
              <Button title={buttonTitle} onClick={handleLogoutClick} />
            ) : (
              <RouterLink to="/signin" spy={true} smooth={true} duration={500}>
                <Button title={buttonTitle} onClick={handleLoginClick} />
              </RouterLink>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
  </div>
  // </div>
  // </div>
);
}


export default Navbar;
