import { useState } from "react"


export const InputCounter = ({quantity, setQuantity}) => {

    const handleChange = (e) => {
        e.preventDefault();
        let newValue = Number(e.target.value);
        if (newValue > 0) setQuantity(newValue);
        else setQuantity(1);
    }

    const decrement = (e) => {
        e.preventDefault();
        let current = Number(quantity)
        if (current > 0) setQuantity(current-1);
    }
    
    const increment = (e) => {
        e.preventDefault();
        let current = Number(quantity)
        setQuantity(current+1);
    }

    return (
        <div className="custom-number-input h-10 w-32">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button onClick={decrement} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number" className="border-transparent focus:border-transparent focus:ring-0 outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={quantity} onChange={handleChange}/>
                <button onClick={increment} className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
}
