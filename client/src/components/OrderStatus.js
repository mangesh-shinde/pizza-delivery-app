import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function OrderStatus() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const resp = await axios.get("/getorders");
    console.log(resp.data.orders);
    setOrders(resp.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-2xl my-4 mx-10 font-bold">Your Orders</h1>
      <section className="container mx-auto">
        <div className="border grid grid-cols-5 gap-3 bg-green-300 rounded-md">
          <div className="mx-2 py-2">
            <h3 className="font-bold ff-open-sans">Order ID</h3>
          </div>
          <div className="mx-2 py-2">
            <h3 className="font-bold ff-open-sans">Order Time</h3>
          </div>
          <div className="mx-2 py-2">
            <h3 className="font-bold ff-open-sans">Order Status</h3>
          </div>
          <div className="mx-2 py-2">
            <h3 className="font-bold ff-open-sans">Order Amount</h3>
          </div>
          <div className="mx-2 py-2">
            <h3 className="font-bold ff-open-sans">Track Order</h3>
          </div>
        </div>
        <div className="my-orders">
        {orders.map((order) => {
          return (<div className="border grid grid-cols-5 gap-3 rounded-md my-3 shadow-md">
            <div className="mx-2 py-2 ff-open-sans text-sm font-bold"><h4 className="ff-open-sans">{order._id}</h4></div>
            <div className="mx-2 py-2 ff-open-sans text-sm font-bold">{order.orderedAt}</div>
            <div className="mx-2 py-2 ff-open-sans text-sm font-bold">{order.orderStatus}</div>
            <div className="mx-2 py-2 ff-open-sans text-sm font-bold">&#8377; {order.totalAmount}</div>
            <div className="mx-2 py-2 ff-open-sans text-sm font-bold"><a href="/" className="text-blue-500">Track order here</a></div>
          </div>)
        })}
        </div>
      </section>
    </>
  );
}

export default OrderStatus;
