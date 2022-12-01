import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeItem } from "../../../store/slices/cart/cartSlice";


export const CartItems = () => {

  const { cart, quantity, subtotal, tax, discount, grant_total } = useSelector((state) => state.cart);

  const dispatch = useDispatch()

  return (
    <>
      <ul>
        {/* Carts items */}
        { cart.map((item, index) => (
          <li key={index} className="sm:flex items-center py-6 border-b border-slate-200">
            {/* Food Image */}
            <div className="block mb-4 sm:mb-0 mr-5 md:w-32 xl:w-auto shrink-0">
              <img className="rounded-sm" src={item.image}  width="200" height="142" alt="Product 01" />
            </div>
            {/* Food detail */}
            <div className="grow">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{item.name}</h3>
              </div>
              <div className="text-sm mb-2">{item.description} </div>
              <div className="text-sm mb-2">Variant {item.variant}</div>
              <div className="text-sm mb-2">Unit {item.unit}</div>
              {/* Product meta */}
              <div className="flex flex-wrap justify-between items-center">
                {/* Quantity and price */}
                <div className="flex flex-wrap items-center space-x-2 mr-2">
                  {/* Quantity */}
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">
                    {item.quantity}
                  </div>
                  <div className="text-slate-400">X</div>
                  {/* Price */}
                  <div>
                    <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">${item.price}</div>
                  </div>
                </div>
                <button 
                  onClick={() => dispatch(removeItem({ index }))}
                  className="text-sm underline hover:no-underline"
                  >
                    Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link to="/customer/foods" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">&lt;- Back To Foods</Link>
      </div>
    </>
  );
}