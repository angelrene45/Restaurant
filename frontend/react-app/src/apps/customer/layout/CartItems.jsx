import { useDispatch, useSelector } from "react-redux";

import { decrementQuantity, incrementQuantity, removeItem } from "../../../store/slices/cart/cartSlice";


export const CartItems = ({readMode = false}) => {

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch()

  return (
    <ul>
      {/* Carts items */}
      {cart.map((item, index) => (
        <li key={index} className="sm:flex items-center py-6 border-b border-slate-200">
          {/* Food Image */}
          <div className="block mb-4 sm:mb-0 mr-5 md:w-32 xl:w-auto shrink-0">
            <img className="rounded-sm" src={item.image} width="200" height="142" alt="Product 01" />
          </div>
          {/* Food detail */}
          <div className="grow">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">{item.name}</h3>
            </div>
            <div>
              <span>
                <h4 className="text-base font-medium text-slate-400 leading-tight">{item.variant}</h4>
                <h4 className="text-base font-medium text-slate-400 leading-tight">{item.unit}</h4>
              </span>
            </div>

            {/* Quantity and price */}
            { readMode === false 
              ? // show buttons for increment and decrement quantity food
              <div className="flex flex-wrap items-center space-x-2 mr-2">
                {/* Button quantity Food */}
                <div className="flex flex-row rounded-lg relative bg-transparent">
                  {
                    (item.quantity === 1)
                      ? // icon remove
                      <button
                        className="flex justify-center items-center bg-emerald-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-6 w-10 rounded-l cursor-pointer outline-none"
                        onClick={() => dispatch(removeItem({ index }))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                      : // icon decrement
                      <button
                        className="bg-emerald-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none"
                        onClick={() => dispatch(decrementQuantity({ index }))}
                      >
                        <span className="font-black">−</span>
                      </button>
                  }

                  <span className="bg-emerald-100 text-gray-600 h-full w-10 rounded-r text-center">
                    {item.quantity}
                  </span>
                  {/* Icon increment */}
                  <button
                    className="bg-emerald-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer"
                    onClick={() => dispatch(incrementQuantity({ index }))}
                  >
                    <span className="font-black">+</span>
                  </button>
                </div>
                {/* Price */}
                <div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 text-center px-2 py-0.5">${item.price}</div>
                </div>
              </div>
              : // show only on read mode all 
              <div className="flex flex-wrap items-center space-x-2 mr-2">
                {/* Quantity and Price*/}
                <div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 text-center px-2 py-0.5 mr-1">{item.quantity}</div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 text-center px-2 py-0.5 mr-1">x</div>
                  <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 text-center px-2 py-0.5 mr-1">${item.price}</div>
                </div>
              </div>
            }

          </div>
        </li>
      ))}
    </ul>
  );
}