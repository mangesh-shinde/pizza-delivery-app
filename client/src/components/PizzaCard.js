import React from 'react'
import Pizza from "../images/pizza-png.png"
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PizzaCard(props) {

    const addToCartHandler = async() => {
        const resp = await axios.post('/addtocart', {
            pizzaId: props.pizzaId
        })
        
        if(resp.status === 200){
            toast("Pizza added to cart!", {
                position: toast.POSITION.TOP_RIGHT,
                type: "success",
                autoClose: 2000
            });
        }else{
            toast("Unable to add pizza to cart", {
                position: toast.POSITION.TOP_RIGHT,
                type: "error",
                autoClose: 2000
            });
        }
        

        console.log(resp)
    }

    return (
        <div className="pizza-card my-4 mx-4 w-48 border-1 px-4 py-4 rounded-md">
            <img src={Pizza} alt="" className="block w-24 mx-auto" />
            <h2 className="mt-3 text-center">{props.pizzaName}</h2>
            <span className="inline-block w-full text-center italic mb-4 mt-2 text-grey-500 bg-gray-200 px-2 py-2 rounded-full text-sm">{props.pizzaSize}</span>
            <div className="flex align-center justify-between">
                <h4 className="my-auto px-2 font-bold">&#8377; {props.pizzaPrice}</h4>
                <button type="submit" onClick={addToCartHandler} className="block border-2 btn px-6 py-2 rounded-full text-sm">Add</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PizzaCard
