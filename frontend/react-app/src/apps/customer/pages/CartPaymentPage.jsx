import { useSelector } from "react-redux"

import { AddressCreateModal } from "../layout/AddressCreateModal"
import { CartItems } from "../layout/CartItems"
import { AddressesCustomer } from "../layout/AddressesCustomer"
import { Link } from "react-router-dom"


export const CartPaymentPage = () => {

  const { subtotal, grant_total, order_type } = useSelector((state) => state.cart);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="lg:relative lg:flex">

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
            <div className="lg:max-w-[640px] lg:mx-auto">

              {/* Cart items */}
              <div className="mb-6 lg:mb-0">
                <div className="mb-3">
                  <div className="flex text-sm font-medium text-slate-400 space-x-2">
                    <span className="text-slate-500">Review</span>
                    <span>-&gt;</span>
                    <span className="text-indigo-500">Payment</span>
                    <span>-&gt;</span>
                    <span className="text-slate-500">Confirm</span>
                  </div>
                </div>

                {/* Pick Up or Delivery */}

                {(order_type === 'shipment')
                  ?
                  <>
                    {/* Shipping Address */}
                    <header>
                      <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Shipping Address</h1>
                    </header>

                    {/* Buttons for add and select Address */}
                    <AddressCreateModal />
                    <AddressesCustomer />
                  </>
                  :
                  <>
                    {/* Pick Up */}
                    <header>
                      <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Pick Up At Restaurant</h1>
                    </header>
                    {/* Cart items */}
                    <CartItems readMode={true} />
                  </>

                }

                {/* Button Back to Payment Review */}
                <div className="mt-6">
                  <Link to="/customer/cart-review" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">&lt;- Back To Cart Review</Link>
                </div>

              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[320px] xl:w-[352px] 2xl:w-[calc(352px+80px)] lg:h-[calc(100vh-64px)]">
              <div className="py-8 px-4 lg:px-8 2xl:px-12">
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <h2 className="text-2xl text-slate-800 font-bold mb-6">Review & Pay</h2>
                  <div className="space-y-6">

                    {/* Order summary */}
                    <div>
                      <div className="text-slate-800 font-semibold mb-2">Order Summary</div>
                      <ul className="mb-4">
                        <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                          <div>Subtotal</div>
                          <div className="font-medium text-slate-800">${subtotal}</div>
                        </li>
                        <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200">
                          <div>Total due (including taxes)</div>
                          <div className="font-medium text-emerald-600">${grant_total}</div>
                        </li>
                      </ul>
                    </div>

                    {/* Payment Details */}
                    <div>
                      <div className="text-slate-800 font-semibold mb-4">Payment Details</div>
                      <div className="space-y-4">
                        {/* Card Number */}
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="card-nr">Card Number <span className="text-rose-500">*</span></label>
                          <input id="card-nr" className="form-input w-full" type="text" placeholder="1234 1234 1234 1234" />
                        </div>
                        {/* Expiry and CVC */}
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">Expiry Date <span className="text-rose-500">*</span></label>
                            <input id="card-expiry" className="form-input w-full" type="text" placeholder="MM/YY" />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">CVC <span className="text-rose-500">*</span></label>
                            <input id="card-cvc" className="form-input w-full" type="text" placeholder="CVC" />
                          </div>
                        </div>
                        {/* Name on Card */}
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="card-name">Name on Card <span className="text-rose-500">*</span></label>
                          <input id="card-name" className="form-input w-full" type="text" placeholder="John Doe" />
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <div className="text-slate-800 font-semibold mb-4">Additional Details</div>
                      <div className="space-y-4">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="card-email">Email <span className="text-rose-500">*</span></label>
                          <input id="card-email" className="form-input w-full" type="email" placeholder="john@company.com" />
                        </div>
                        {/* Country */}
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="card-country">Country <span className="text-rose-500">*</span></label>
                          <select id="card-country" className="form-select w-full">
                            <option>Italy</option>
                            <option>USA</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="mb-4">
                        <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Pay ${grant_total}</button>
                      </div>
                      <div className="text-xs text-slate-500 italic text-center">You'll be charged ${grant_total}, including $48 for VAT in Italy</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
