import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import axios from "axios";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom"

function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [pizzas, setPizzas] = useState([]);

  const fetchCartData = async () => {
    const res = await axios.get('/getcart')
    console.log("Setting pizzas")
    setPizzas(res.data.cart.cart)
    console.log("cart: ", res.data.cart.cart)

    let allPizzas = res.data.cart.cart
    // console.log("AllPizzas: ", allPizzas)
    let total = allPizzas.reduce(function(acc, curr){
      // console.log("Test: ", curr._id.pizzaPrice,curr.itemQty )
      return acc + curr._id.pizzaPrice * curr.itemQty
    },0)
    console.log("Total: ", total)

    // pizzas.forEach(pizza => {
    //   console.log("Pizza: ", pizza._id.pizzaPrice, pizza.itemQty)
    //   total += pizza._id.pizzaPrice * pizza.itemQty
    // })

    if(total !== totalAmount){
      setTotalAmount(total)
    }
     
    console.log(`Done setting up total : ${total}`)
  }

  useEffect(() => {
    console.log(`Invoking fetchCartdata when totalAmount is : ${totalAmount}`)
    fetchCartData();
    // calculateInitialTotal();
  },[totalAmount]);

  const orderHandler = () => {
    console.log("Order Placed")
    axios.post('/placeorder', {
      cart: pizzas,
      totalAmount: totalAmount
    }).then(res => { 
      setPizzas([])
      alert("Order placed")
    })
    .catch(error => console.log(error))
  }

  const calculateAmount = (price, quantity, action) => {
    if (action === "add") {
      setTotalAmount((prevAmount) => prevAmount + (price));
    } else if (action === "subtract") {
      setTotalAmount((prevAmount) => prevAmount - (price));
    }
  };


  if (pizzas.length === 0) {
    return <EmptyCart />;
  }

  console.log("Rendering cart")

  return (
    <>
      <Navbar />
      <div className="flex align-center justify-end my-2">
        <li className="px-5 my-auto list-none">
          <Link to="/orders" className="btn-orders block border-2 px-5 py-2 rounded-md">My Orders</Link>
        </li>
      </div>
      <div className="w-2/3 mx-auto">
        <h2 className="font-bold text-2xl text-center my-4">Order Summary</h2>
        <div className="w-4/5 mx-auto border-2 rounded-md">
          {
            pizzas.map((pizza,idx) => ( <CartItem pizzaName={pizza._id.pizzaName} pizzaSize={pizza._id.pizzaSize} price={pizza._id.pizzaPrice} quantity={pizza.itemQty} calculateAmount={calculateAmount} pizzaId={pizza._id._id} key={idx} cartPizzas={setPizzas} /> ))
          }

        </div>
        <div className="w-4/5 mx-auto flex align-center justify-between my-4 px-4">
          <h3 className="font-bold text-lg">Total Amount:</h3>
          <h3 className="font-bold text-lg">&#8377; {totalAmount} </h3>
        </div>
        <div className="w-4/5 mx-auto flex align-center justify-end">
          <button
            type="submit"
            className="block btn px-6 py-2 rounded-full text-white"
            onClick={orderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
