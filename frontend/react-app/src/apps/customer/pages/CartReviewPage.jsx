import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { CartItems } from "../layout/CartItems"


export const CartReviewPage = () => {

  const { cart, quantity, subtotal, tax, discount, grant_total } = useSelector((state) => state.cart)

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}

      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">

          {/* Page content */}
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

            {/* Cart items */}
            <div className="mb-6 lg:mb-0">
              <div className="mb-3">
                <div className="flex text-sm font-medium text-slate-400 space-x-2">
                  <span className="text-indigo-500">Review</span>
                  <span>-&gt;</span>
                  <span className="text-slate-500">Payment</span>
                  <span>-&gt;</span>
                  <span className="text-slate-500">Confirm</span>
                </div>
              </div>
              <header className="mb-2">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Shopping Cart ({quantity}) ✨</h1>
              </header>

              {/* Cart items */}
              <CartItems />
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                <div className="text-slate-800 font-semibold mb-2">Order Summary</div>
                {/* Order details */}
                <ul className="mb-4">
                  <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                    <div>Subtotal</div>
                    <div className="font-medium text-slate-800">${subtotal}</div>
                  </li>
                  <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                    <div>Taxes</div>
                    <div className="font-medium text-slate-800">${tax}</div>
                  </li>
                  <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                    <div>Discount</div>
                    <div className="font-medium text-slate-800">-${discount}</div>
                  </li>
                  <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                    <div>Grant total (including taxes)</div>
                    <div className="font-medium text-emerald-600">${grant_total}</div>
                  </li>
                </ul>

                <div className="mb-4">
                  <Link to="/customer/cart-payment" className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Continue - ${grant_total}</Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>

  )
}
