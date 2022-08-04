import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity);

  const incrementQuantity = async () => {
    const res = await axios.post("/incrementqty", {
      itemId: props.pizzaId,
    });
    console.log(res.data.cart.cart);
    const cartData = res.data.cart.cart;
    const item = cartData.find((item) => item._id === props.pizzaId);
    setQuantity(item.itemQty);
    props.calculateAmount(props.price,item.itemQty, "add");
  };

  const decrementQuantity = async () => {
    if (quantity > 0) {
      const res = await axios.post("/decrementqty", {
        itemId: props.pizzaId,
      });
      console.log(res.data.cart.cart);
      const cartData = res.data.cart.cart;
      const item = cartData.find((item) => item._id === props.pizzaId);
      setQuantity(item.itemQty);
      props.calculateAmount(props.price,item.itemQty, "subtract");
    } else {
      setQuantity(0);
    }
  };

  const deleteItem = async () => {
    await axios.post("/deleteitem", {
      itemId: props.pizzaId
    });

  };

  console.log("Rendering cart item");

  return (
    <div className="border-b-2 flex align-center justify-between py-2 w-4/5 mx-auto rounded-md">
      <div className="my-auto text-center">
        <h3 className="my-2 font-bold">{props.pizzaName}</h3>
        <p className="w-2/3 mx-auto mb-2 italic py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
          {props.pizzaSize}
        </p>
      </div>
      <div className="my-auto text-center">
        <p>{props.price}</p>
        <div className="flex align-center justify-around border-2 my-2 rounded-md border-orange">
          <button
            type="submit"
            className="block px-2"
            onClick={incrementQuantity}
          >
            +
          </button>
          <p className="mx-2">{quantity}</p>
          <button
            type="submit"
            className="block px-2"
            onClick={decrementQuantity}
          >
            -
          </button>
        </div>
      </div>
      <div className="my-auto text-black-500">
        <button type="submit" className="" onClick={deleteItem}>
          {<DeleteIcon />}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
