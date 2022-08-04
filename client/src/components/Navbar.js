import React, { useEffect, useContext} from "react";
import PizzaLogo from "../images/pizza_logo1.png"
import {Link} from 'react-router-dom'
import CartIco from '../images/shopping-cart.ico'
//import Cookies from 'js-cookie'
import { UserContext } from "../App";

function Navbar(props){
    const {state} = useContext(UserContext)
    
    // useEffect(() => {
    //     if(Cookies.get('jwt')){
    //         dispatch({type: "USER", payload: true})
    //     }
    // })
    

    return(
        <>
        <nav className="flex align-center justify-between bg-light px-6">
            <div className="w-16">
                <img src={PizzaLogo} alt="pizza" />
            </div>
            <ul className="flex align-center justify-center my-auto">
                <li className="px-5 my-auto"><Link to="/">Home</Link></li>
                <li className="px-5 my-auto"><Link to="/menu">Menu</Link></li>
                <li className="px-5 my-auto"><Link to="/cart"><span className="flex align-center justify-center"><p>Cart</p>  <img src={CartIco} alt="cart-ico" className="w-6 inline-block" /></span></Link></li>
                {
                    state ?  <li className="px-5 my-auto"><Link to="/logout" className="btn-login block border-2 px-5 py-2 rounded-md">Logout</Link></li> : <li className="px-5 my-auto"><Link to="/login" className="btn-login block border-2 px-5 py-2 rounded-md">Login</Link></li>
                }
            </ul>
        </nav>
        </>
    )

}

export default Navbar;