import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Slider from "react-slick";
import Button from "../layouts/Button";
import { BsStarHalf, BsStarFill } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MyContext from "../authContext";

const HomeProduct = () => {
  const { cartOrderCount, setCartOrderCount } = useContext(MyContext);
  const { data, error, refetch } = useFetchData(
    "https://kahpehbini-api.vercel.app/api/v1/products"
  );
  const [products, setProducts] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const addToCart = (productId) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartOrderCount(cartOrderCount + 1);
    const hasSimilarProduct = cartItems.some((item) => item._id === productId);
    if (hasSimilarProduct) {
      cartItems = cartItems.map((cart) => {
        if (cart._id === productId) {
          return { ...cart, quantity: cart.quantity + 1 };
        } else {
          return cart;
        }
      });
    } else {
      console.log(cartOrderCount);
      const product = { _id: productId, quantity: 1 };
      cartItems.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowRight
        className={className}
        style={{ ...style, display: "block", color: "black", fontSize: "30px" }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowLeft
        className={className}
        style={{ ...style, display: "block", color: "black", fontSize: "30px" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-backgroundColor">
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">
        Our Kah-peh Bin(i)s
      </h1>

      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index} className="px-2">
            <div className="bg-white p-3 rounded-lg shadow-md">
              {product.image && (
                <img
                  src={product.image.path}
                  alt={product.itemName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-xl font-semibold">{product.itemName}</h3>
                <div className="flex">
                  <BsStarFill className="text-brightColor" />
                  <BsStarFill className="text-brightColor" />
                  <BsStarFill className="text-brightColor" />
                  <BsStarFill className="text-brightColor" />
                  <BsStarHalf className="text-brightColor" />
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  ${product.unitPrice}
                </p>
                <p className="text-gray-500 text-center">
                  {product.description}
                </p>
                <Button
                  title="Add to Cart"
                  onClick={() => addToCart(product._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeProduct;
