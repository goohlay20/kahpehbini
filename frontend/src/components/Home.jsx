import React from "react";
import img from "../assets/img/LP_image.png";
import Button from "../layouts/Button";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#FFDCAB] to-[#AB6B2E] ">
      <div className=" w-full lg:w-2/4 space-y-4 mt-14 lg:mt-0">
        <h1 className="font-semibold lg:text-5xl text-3xl text-center lg:text-start leading-tight">
          Pan-kah-peh-ko, <br />
          Pan-kah-peh-ko <br />
          OH!
        </h1>
        <br />
        <h2 className="font-semibold lg:text-3xl text-xl text-center lg:text-start leading-tight">
          "SAIS lang ang Kah-peh ko"
        </h2>
        <p className="text-lg text-center w-3/4 lg:text-start leading-tight">
          Boost your productivity and build your mood with a glass of coffee in
          the morning, brewed from fresh locally-farmed coffee beans
        </p>
        <br />
        <div className=" flex flex-row gap-6">
          <Link to="/products">
            <Button title="ADD TO CART" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <img src={img} alt="img" />

        <div className=" absolute bg-white px-8 py-2 top-5 right-0 rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <h2 className=" font-semibold">Arabica</h2>
        </div>

        <div className=" absolute bg-white px-8 py-2 bottom-0 -left-10 rounded-full">
          <h2 className=" font-semibold">Robusta</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
