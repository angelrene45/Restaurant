import { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'


import { clearCart, decrementQuantity, incrementQuantity, removeItem } from '../../../store/slices/cart'
import { useCreateOrderMutation } from '../../../store/slices/orders'


export const CartInfoModal = ({ open, setOpen }) => {

  // get cart from redux store
  const { cart, quantity, subtotal, tax, discount, grant_total } = useSelector((state) => state.cart)

  // navigate hook
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  const clickContinueOrder = () => {
    navigate("/customer/cart-review");
    setOpen(false)
  }

  return (
    <>
      {/* Cart Icon */}
      <button
        className="w-20 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 transition duration-150 rounded-full"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Cart</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
          <path d="M17 17h-11v-14h-2" />
          <path d="M6 5l14 1l-1 7h-13" />
        </svg>
        <span className="text-sm ml-2">{quantity}</span>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></div>
      </button>
      {/* Modal Cart */}
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
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-2 lg:max-w-2xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
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

                    <div className='grid w-full grid-cols-1'>
                      <h2 className="text-2xl text-slate-800 font-bold mb-6">Cart Summary</h2>

                      {/* Cart items */}
                      {
                        cart.map((item, index) => (
                          <div key={index} className="flex items-center py-3 border-b border-slate-200">
                            {/* Image Food */}
                            <span className="block mr-2 xl:mr-4 shrink-0">
                              <img className="w-20 xl:w-20" src={item.image} alt={item.variant} />
                            </span>
                            {/* Details Food */}
                            <div className="grow">
                              <span>
                                <h4 className="text-base font-medium text-slate-800 leading-tight">{item.name}</h4>
                                <h4 className="text-sm font-medium text-slate-400 leading-tight">{item.variant}</h4>
                                <h4 className="text-sm font-medium text-slate-400 leading-tight">{item.unit}</h4>

                                {/* Button quantity Food */}
                                <div className="h-5 w-13">
                                  <div className="flex flex-row rounded-lg relative bg-transparent">
                                    {
                                      (item.quantity === 1)
                                        ? // icon remove
                                        <button
                                          className="flex justify-center items-center bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-6 w-10 rounded-l cursor-pointer outline-none"
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
                                          className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none"
                                          onClick={() => dispatch(decrementQuantity({ index }))}
                                        >
                                          <span className="font-black">−</span>
                                        </button>
                                    }

                                    <span className="bg-gray-100 text-gray-600 h-full w-10 rounded-r text-center">
                                      {item.quantity}
                                    </span>
                                    {/* Icon increment */}
                                    <button
                                      className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer"
                                      onClick={() => dispatch(incrementQuantity({ index }))}
                                    >
                                      <span className="font-black">+</span>
                                    </button>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div className="text-base font-medium text-slate-800 ml-2">${item.price}</div>
                          </div>
                        ))
                      }

                      {/* Fees, discount and subtotal */}
                      <div>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-base">Subtotal</div>
                          <div className="text-base font-medium text-slate-800 ml-2">${subtotal}</div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-base">Taxes</div>
                          <div className="text-base font-medium text-slate-800 ml-2">${tax}</div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="flex items-center">
                            <span className="text-base mr-2">Discount</span>
                          </div>
                          <div className="text-base font-medium text-slate-800 ml-2">-${discount}</div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200">
                          <div className="text-base">Total</div>
                          <div className="text-base font-medium text-emerald-600 ml-2">${grant_total}</div>
                        </li>
                      </div>

                      <button
                        onClick={clickContinueOrder}
                        type="button"
                        className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                      >
                        Continue Order
                        </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
