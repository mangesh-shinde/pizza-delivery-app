import React, {useState, useContext} from "react";
import Navbar from "./Navbar";
import LoginImg from "../images/login.jpg";
import {Link} from 'react-router-dom';
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'
import { UserContext } from "../App";
import Welcome from "./Welcome";

function Login() {

  const { dispatch } = useContext(UserContext)
  let navigate = useNavigate();

  //store email and password to login
  const [user, setUser] = useState({email: "", password: ""})

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let name, value;
  
  const onChangeHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]: value})

  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/login', user).then(response => {
      dispatch({type: "USER", payload: true})
      setIsLoggedIn(true)
      alert(response.data.message)
      navigate("/");
    })
  }

  const getLoginStatus = () => {
    return isLoggedIn;
  }

  return (
    <div className="bg-gray-light h-screen">
      <Navbar getLoginStatus={getLoginStatus}/>
      <section className="border-2 bg-white flex align-center justify-around w-3/5 mx-auto mt-10 rounded-md shadow ">
        
        <div className="my-auto px-2">
        <h2 className="text-center my-2 font-bold text-purple-500 text-2xl">Login</h2>
          <form onSubmit={onSubmitHandler}>
            <div>
              <label className="block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
                autoComplete="off"
                placeholder="Email"
                className="border-2 text-sm py-1 px-1 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={onChangeHandler}
                autoComplete="off"
                placeholder="Password"
                className="border-2 text-sm py-1 px-1"
              />
            </div>
            <div className="mt-4 mb-4">
              <button type="submit" className="btn px-6 py-1 rounded-md">Login</button>
            </div>
          </form>
          <Link to="/register" className="text-xs block text-right font-bold text-color-secondary">Don't have account?</Link>
        </div>
        <div className="flex align-center w-1/2">
          <img src={LoginImg} alt={"login"} className="block w-full" />
        </div>
      </section>
    </div>
  );
}

export default Login;
