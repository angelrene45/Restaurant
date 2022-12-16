import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AddressCreateModal } from "../layout/AddressCreateModal"
import { CartItems } from "../layout/CartItems"
import { AddressesCustomer } from "../layout/AddressesCustomer"
import { SpinnerButton } from "../../../components/items/Spinner";
import { displayMessage } from "../../../utils/swalMsg";
import { useCreateOrderMutation } from "../../../store/slices/orders";
import { clearCart } from "../../../store/slices/cart";


export const CartPaymentPage = () => {

  // redux state 
  const { cart, quantity, subtotal, tax, discount, grant_total, order_type, note, address } = useSelector((state) => state.cart);
  const { status, userData, userType } = useSelector((state) => state.auth);

  // mutation for create order
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    card_nr: '1234123412341234',
    card_expiry: '10/27',
    card_cvc: '250',
    card_name: 'Generic Name',
  }

  const handleSubmitPayment = async (formData, { resetForm }) => {

    // validate customer add address on shipment type
    if (order_type === 'shipment' && !address) {
      displayMessage("Please add or select an address")
      return
    }
    // call payment api 

    // call order api
    const order_id = await prepareOrder();
    if (order_id) {
      await resetForm();
      navigate(`/customer/cart-confirm/${order_id}`);
    }

  }

  const prepareOrder = async () => {
    // retrieve customer_id if user is authenticated
    const customer_id = userData ? userData?.id : null

    // build Json Data for backend
    const apiData = {
      user_id: null,
      customer_id: customer_id,
      board_id: null,
      foods: cart,
      note: note,
      status: "new",
      order_type,
      address,
      subtotal,
      tax,
      discount,
      grant_total
    }

    // call api for create order
    const { data, error } = await createOrder(apiData);

    // new order inserted
    if (!error && data) {
      // show success message 
      displayMessage("Order has been created", "info", { showConfirmButton: false, timer: 1500 })
      // clear cart 
      dispatch(clearCart())
      // get id order
      const { id } = data
      return id
    }
    // error in order
    else {
      displayMessage(error?.data?.detail, "error")
      return ''
    }
  }


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
                        <Formik
                          initialValues={{ ...initialValues }}
                          onSubmit={handleSubmitPayment}
                          validationSchema={
                            Yup.object({
                              card_nr: Yup.string()
                                .max(16)
                                .required("Required"),
                              card_expiry: Yup.string()
                                .required("Required"),
                              card_cvc: Yup.string()
                                .min(3)
                                .max(4)
                                .required("Required"),
                              card_name: Yup.string()
                                .required("Required"),
                            })
                          }
                        >
                          {
                            (formik) => (
                              <Form>
                                {/* Card Number */}
                                <div>
                                  <label className="block text-sm font-medium mb-1" htmlFor="card_nr">Card Number <span className="text-rose-500">*</span></label>
                                  <Field name="card_nr" className="form-input w-full" type="number" placeholder="1234 1234 1234 1234" />
                                  <ErrorMessage name="card_nr" component="div" className="text-xs mt-1 text-rose-500" />
                                </div>
                                {/* Expiry and CVC */}
                                <div className="flex space-x-4">
                                  <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1" htmlFor="card_expiry">Expiry Date <span className="text-rose-500">*</span></label>
                                    <Field name="card_expiry" className="form-input w-full" type="text" placeholder="MM/YY" />
                                    <ErrorMessage name="card_expiry" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1" htmlFor="card_cvc">CVC <span className="text-rose-500">*</span></label>
                                    <Field name="card_cvc" className="form-input w-full" type="number" placeholder="CVC" />
                                    <ErrorMessage name="card_cvc" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                </div>
                                {/* Name on Card */}
                                <div>
                                  <label className="block text-sm font-medium mb-1" htmlFor="card_name">Name on Card <span className="text-rose-500">*</span></label>
                                  <Field name="card_name" className="form-input w-full" type="text" placeholder="John Doe" />
                                  <ErrorMessage name="card_name" component="div" className="text-xs mt-1 text-rose-500" />
                                </div>
                                <div className="mt-6">
                                  <div className="mb-4">
                                    <SpinnerButton
                                      classNameEnable="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                      classNameDisabled="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                      type="submit"
                                      isLoading={isLoading}
                                      value={`Pay - $${grant_total}`}
                                    />
                                  </div>
                                  <div className="text-xs text-slate-500 italic text-center">You'll be charged ${grant_total}, including $48 for VAT in Italy</div>
                                </div>
                              </Form>
                            )
                          }
                        </Formik>
                      </div>
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
