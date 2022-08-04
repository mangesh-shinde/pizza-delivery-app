import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Register from './components/Register';
import EmptyCart from "./components/EmptyCart";
import Cart from "./components/Cart";
import Logout from "./components/Logout"
import React, { useReducer }  from "react";
import OrderStatus from "./components/OrderStatus"
import NotifySuccess from "./components/NotifySuccess";


export const UserContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return true
    case "SIGN_OUT":
      return false
    default:
      return state
  }
}


function App() {
  const initialState = false;
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/orders" element={<OrderStatus />} />
        <Route path="/notify" element={<NotifySuccess />} />
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
