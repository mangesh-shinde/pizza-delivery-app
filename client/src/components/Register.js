import React, {useState} from "react";
import Navbar from "./Navbar";
import LoginImg from "../images/login.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: ""
  })

  let name, value;
  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]: value})
  }

  const onSubmitHandler = (e) => {
    if(user.password !== user.confirmPassword){
      alert("Password is not matching")
      return;
    }

    e.preventDefault();
    axios.post('/register', user).then(response => {
      alert(response.data.message)
      navigate("/login")
    })
    
  }

  return (
    <div className="bg-gray-light h-screen">
      <Navbar />
      <section className="border-2 bg-white flex align-center justify-between rounded-md shadow w-2/3 mx-auto px-4 py-4 mt-4">
        <div className="my-auto px-2 w-2/3">
        <h2 className="text-center my-2 font-bold text-purple-500 text-2xl">Register</h2>
          <form onSubmit={onSubmitHandler}>
          <div className="mt-4">
              <label className="block font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                autoComplete="off"
                placeholder="Your name"
                className="border-2 text-sm py-1 px-1 w-2/3"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-4 w-full">
              <label className="block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                autoComplete="off"
                placeholder="Email"
                className="border-2 text-sm py-1 px-1 w-2/3"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                autoComplete="off"
                placeholder="Mobile number"
                className="border-2 text-sm py-1 px-1 w-2/3"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                autoComplete="off"
                placeholder="Password"
                className="border-2 text-sm py-1 px-1 w-2/3"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                autoComplete="off"
                placeholder="Retype Password"
                className="border-2 text-sm py-1 px-1 w-2/3"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-4 mb-4">
              <button type="submit" className="btn px-6 py-1 rounded-md">Register</button>
            </div>
          </form>
          <Link to="/login" className="text-xs block text-right font-bold text-color-secondary w-2/3">Already have account?</Link>
        </div>
        <div className="w-1/2 my-auto">
          <img src={LoginImg} alt={"login"} className="" />
        </div>
      </section>
    </div>
  );
}

export default Register;
