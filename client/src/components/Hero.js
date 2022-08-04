import React from 'react'
import HeroImg from '../images/pizza_hero.png'

function HeroSection(){

    return(

        <section className="hero-section flex align-center justify-around py-6 bg-gray" >
            <div className="my-auto">
                <h1 className="text-4xl italic text-center font-bold">Feeling hungry?</h1>
                <h3 className=" text-xl mt-3">Order our delicious pizza</h3>
                <button type="submit" className="btn mt-4 border-2 px-6 py-2 rounded-full bg-orange  border-orange font-bold hover:btn-hover">Order Now</button>
            </div>
            <div>
                <img src={HeroImg} alt="pizza-hero" />
            </div>
        </section>

    )
}

export default HeroSection;