import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

import { decrementQuantity, incrementQuantity, removeItem } from '../../../store/slices/cart'

export const OrderInfo = ({open, setOpen}) => {

  // get cart from redux store
  const { cart, quantity, total } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-4 h-4 fill-current">
                        <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                    </svg>
                  </button>

                  <div>
                    <div>
                      <div className="px-1">
                        <div className="max-w-sm mx-auto lg:max-w-none">
                          <h2 className="text-2xl text-slate-800 font-bold mb-6">Order Summary</h2>
                          <div className="space-y-6">

                            {/* Order Details */}
                            <div>
                              <div className="text-slate-800 font-semibold mb-2">Order Details</div>
                              {/* Cart items */}
                              <ul>
                              {
                                cart.map((item, index) => (
                                  <li key={index} className="flex items-center py-3 border-b border-slate-200">
                                    <span className="block mr-2 xl:mr-4 shrink-0" href="#0">
                                      <img className="w-16 xl:w-20" src={item.image} width="200" height="142" alt={item.variant} />
                                    </span>
                                    <div className="grow">
                                      <span>
                                        <h4 className="text-sm font-medium text-slate-800 leading-tight">{item.name}</h4>
                                        <h4 className="text-xs font-medium text-slate-400 leading-tight">{item.variant}</h4>
                                        <h4 className="text-xs font-medium text-slate-400 leading-tight">{item.unit}</h4>
                                        
                                        <div className="h-5 w-13">
                                          <div className="flex flex-row rounded-lg relative bg-transparent">
                                              {
                                                (item.quantity === 1)
                                                ? // icon remove
                                                <button 
                                                  className="flex justify-center items-center bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-6 w-10 rounded-l cursor-pointer outline-none"
                                                  onClick={() => dispatch(removeItem({index}))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                      <line x1="4" y1="7" x2="20" y2="7" />
                                                      <line x1="10" y1="11" x2="10" y2="17" />
                                                      <line x1="14" y1="11" x2="14" y2="17" />
                                                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                    </svg>
                                                </button>
                                                : // icon decrement
                                                <button 
                                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none"
                                                    onClick={() => dispatch(decrementQuantity({index}))}
                                                  >
                                                  <span className="font-black">−</span>
                                                </button>
                                              }

                                              <span className="bg-gray-100 text-gray-600 h-full w-10 rounded-r text-center">
                                                {item.quantity}
                                              </span>
                                              <button 
                                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer"
                                                onClick={() => dispatch(incrementQuantity({index}))}
                                              >
                                              <span className="font-black">+</span>
                                              </button>
                                          </div>
                                        </div>
                                      
                                      </span>                                
                                    </div>
                                    <div className="text-sm font-medium text-slate-800 ml-2">${item.price}</div>
                                  </li>
                                ))
                              }
                              </ul>
                              {/* Fees, discount and total */}
                              <ul>
                                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                  <div className="text-sm">Subtotal</div>
                                  <div className="text-sm font-medium text-slate-800 ml-2">${total}</div>
                                </li>
                                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                  <div className="text-sm">Taxes</div>
                                  <div className="text-sm font-medium text-slate-800 ml-2">$0</div>
                                </li>
                                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                  <div className="flex items-center">
                                    <span className="text-sm mr-2">Discount</span>
                                    <span className="text-xs inline-flex whitespace-nowrap font-medium uppercase bg-slate-200 text-slate-500 rounded-full text-center px-2.5 py-1">
                                      XMAS22
                                    </span>
                                  </div>
                                  <div className="text-sm font-medium text-slate-800 ml-2">-$0</div>
                                </li>
                                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                  <div className="text-sm">Total</div>
                                  <div className="text-sm font-medium text-emerald-600 ml-2">${total}</div>
                                </li>
                              </ul>
                            </div>

                            {/* Payment Details */}
                            <div>
                              <div className="text-slate-800 font-semibold mb-4">Payment Details</div>
                              <div className="text-sm rounded border border-slate-200 p-3">
                                <div className="flex items-center justify-between space-x-2">
                                  {/* CC details */}
                                  <div className="flex items-center">
                                    {/* Mastercard icon */}
                                    <svg className="shrink-0 mr-3" width="32" height="24" xmlns="http://www.w3.org/2000/svg">
                                      <rect fill="#1E293B" width="32" height="24" rx="3" />
                                      <ellipse fill="#E61C24" cx="12.522" cy="12" rx="5.565" ry="5.647" />
                                      <ellipse fill="#F99F1B" cx="19.432" cy="12" rx="5.565" ry="5.647" />
                                      <path
                                        d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z"
                                        fill="#F26622"
                                      />
                                    </svg>
                                    <div>
                                      Ending with <span className="text-slate-800">2478</span>
                                    </div>
                                  </div>
                                  {/* Expiry */}
                                  <div className="italic ml-2">Expires 12/23</div>
                                </div>
                              </div>
                            </div>

                            {/* Button Make Order */}
                            <div className="mt-6">
                              <div className="mb-4">
                                <Link to="/ecommerce/pay" className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                                  View Your Order
                                </Link>
                              </div>
                              <div className="text-xs text-slate-500 italic text-center">
                                Should you ever change your mind, we offer a 14-day, no-questions-asked refund policy.
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
