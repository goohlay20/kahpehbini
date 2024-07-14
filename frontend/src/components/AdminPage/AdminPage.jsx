import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import Products from "./Products/Products";
import Orders from "./Orders";
import Customers from "./Customers";
import Subscription from "./Subscription";

function AdminPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/6 p-4 bg-coffee w-4">
          <ul className="flex md:block">
            <li className="mb-4 mt-10 md:mt-40">
              <NavLink
                to="products"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 text-white bg-brown-600 rounded w-full"
                    : "block p-2 text-white hover:bg-brown-300 rounded w-full"
                }
              >
                Products
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 text-white bg-brown-600 rounded w-full"
                    : "block p-2 text-white hover:bg-brown-300 rounded w-full"
                }
              >
                Orders
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="customers"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 text-white bg-brown-600 rounded w-full"
                    : "block p-2 text-white hover:bg-brown-300 rounded w-full"
                }
              >
                Customers
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="subscription"
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 text-white bg-brown-600 rounded w-full"
                    : "block p-2 text-white hover:bg-brown-300 rounded w-full"
                }
              >
                Subscription
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 bg-yellow-50">
          <Routes>
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="subscription" element={<Subscription />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
