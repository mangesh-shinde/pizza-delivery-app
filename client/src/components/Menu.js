import React, {useState ,useEffect} from 'react'
import Navbar from './Navbar'
import PizzaCard from './PizzaCard';
import axios from 'axios'

function Menu() {

    const [pizzaList, setPizzaList] = useState([])
    const fetchMenu = async () => {
        const resp = await axios.get('/menu')
        const pizzaObj = await resp.data
        const pizzas = pizzaObj.pizzas;
        console.log(pizzas)
        setPizzaList(pizzas)
    }

    useEffect( () => {
        fetchMenu();
    }, [])

    return (
        <>
        <Navbar />
        <div className="text-center mt-5 mb-5 text-3xl font-bold">
            <h1>We serve</h1>
        </div>
        <div className="menu flex flex-wrap align-center justify-start w-full mx-auto">
            {
                pizzaList.map((pizza, idx) => <PizzaCard pizzaId={pizza._id} pizzaName={pizza.pizzaName} pizzaSize={pizza.pizzaSize} pizzaPrice={pizza.pizzaPrice} key={idx} />)
            }
        </div>
        </>
    )
}

export default Menu;
