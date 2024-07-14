import React from "react";
import { Link } from "react-scroll";
import img from "../assets/img/Kahpeh_Bini_logo2.png";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E] text-black mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <Link to="/">
            <img src={img} alt="Kah-peh Binis Logo" className="h-16" />
          </Link>
          <p className=" text-sm">
            Here at Kah-peh Binis, we are proud to offer you the finest coffee
            beans from the Philippines while paying homage to our favorite girl
            group, BINI.
          </p>
        </div>
        {/* <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Menu
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              About Us
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Products
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Reviews
            </a>
          </nav>
        </div> */}
        {/* <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Cappuccino
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Latte
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              Americano
            </a>
          </nav>
        </div> */}
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              kahpehbini@gmail.com
            </a>
            <a
              className=" hover:text-backgroundColor transition-all cursor-pointer"
              href="/"
            >
              +639 9999 1234
            </a>
            <div className="grid grid-cols-3">
              <a
                className=" hover:text-backgroundColor transition-all cursor-pointer"
                href="/"
              >
                {" "}
                <img
                  src="../../src/assets/img/icons8-facebook-96.png"
                  className="h-8 w-auto"
                />
              </a>
              <a
                className=" hover:text-backgroundColor transition-all cursor-pointer"
                href="/"
              >
                {" "}
                <img
                  src="../../src/assets/img/icons8-whatsapp-96.png"
                  className="h-8 w-auto"
                />
              </a>
              <a
                className=" hover:text-backgroundColor transition-all cursor-pointer"
                href="/"
              >
                {" "}
                <img
                  src="../../src/assets/img/msgr.png"
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div>
        {/* <p>
          <p className=" text-center py-4">
            @copyright developed by
            <span className=" text-backgroundColor">
              {" "}
              champion programmers{" "}
            </span>
            | All rights reserved
          </p>
        </p> */}
      </div>
    </div>
  );
};

export default Footer;
