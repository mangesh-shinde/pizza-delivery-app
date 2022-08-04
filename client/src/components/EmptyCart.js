import React from "react";
import Navbar from "./Navbar";
import EmptyCartImg from "../images/cart_empty.png";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div>
      <Navbar />
      <div className="flex align-center justify-end my-2">
        <li className="px-5 my-auto list-none">
          <Link to="/orders" className="btn-orders block border-2 px-5 py-2 rounded-md">My Orders</Link>
        </li>
      </div>

      <section className="w-4/5 mx-auto">
        <div className="w-1/2 mx-auto">
          <img src={EmptyCartImg} alt={"empty cart"} />
        </div>
        <h1 className="text-center text-3xl">YOUR SHOPPING CART IS EMPTY</h1>
        <h2 className="text-center mt-2 text-gray-700">
          Please click the button below to continue shopping
        </h2>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="border-2 px-4 py-2 rounded-md border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white add-transition"
          >
            Return to Homepage
          </Link>
        </div>
      </section>
    </div>
  );
}

export default EmptyCart;
