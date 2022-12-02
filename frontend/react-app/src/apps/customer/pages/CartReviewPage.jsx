import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { CartItems } from "../layout/CartItems"
import { SpinnerButton } from '../../../components/items/Spinner'
import { useCreateOrderMutation } from "../../../store/slices/orders";
import { addOrderType, addOrderNote, clearCart } from "../../../store/slices/cart";


const MySwal = withReactContent(Swal);


export const CartReviewPage = () => {

  // get redux state from cart and customer data
  const { cart, quantity, subtotal, tax, discount, grant_total, order_type, note } = useSelector((state) => state.cart);
  const { status, userData, userType } = useSelector((state) => state.auth)

  // mutation for create order
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // dispatch hook for redux actions
  const dispatch = useDispatch();

  // navigate hook
  const navigate = useNavigate()

  // button when user click on make order
  const submitOrderCart = async (formData) => {

    dispatch(addOrderType({order_type: formData.order_type}))
    dispatch(addOrderNote({note: formData.note}))

    // validate cart contains values
    if (cart.length === 0) {
      showError("Add foods to cart")
      return
    }

    // check order type that choose user
    switch (formData.order_type) {
      case 'restaurant':
        await typeRestaurant(formData)
        break;

      case 'pick_up':
        navigate("/customer/cart-payment");
        break;

      case 'shipment':
        navigate("/customer/cart-payment");
        break;

      default:
        showError(`Order Type ${formData.order_type} not supported`)
    }

  }

  // Logic for Order Type Restaurant
  const typeRestaurant = async (formData) => {
    // retrieve customer_id if user is authenticated
    const customer_id = userData ? userData?.id : null

    // build Json Data for backend
    const apiData = {
      user_id: null,
      customer_id: customer_id,
      board_id: null,
      foods: cart,
      note: formData.value,
      status: "new",
      subtotal,
      tax,
      discount,
      grant_total
    }

    // call api for create order
    const { data, error } = await createOrder(apiData)

    // new order inserted
    if (!error && data) {
      // show success message 
      showSuccess()
      // clear cart 
      dispatch(clearCart())
    }
    // error in order
    else {
      showError(error?.data?.detail)
    }
  }

  // error on api call
  const showError = (msg) => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }

  // function for show success on api call
  const showSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: `Order has been created`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="lg:relative lg:flex">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
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

              {/* Navigate to foods Page */}
              <div className="mt-6">
                <Link to="/customer/foods" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">&lt;- Back To Foods</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="py-8">
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

                {/* Form */}
                <Formik
                  initialValues={{
                    order_type,
                    note,
                    table_code: ''
                  }}
                  onSubmit={submitOrderCart}
                  validationSchema={
                    Yup.object({
                      order_type: Yup.string()
                        .required("Required"),
                      table_code: Yup.string().when('order_type', {
                        is: (order_type) => order_type === "restaurant", // this validation only with restaurant option selected
                        then: Yup.string().required('Field is required').length(4),
                        otherwise: Yup.string()
                      }),
                      note: Yup.string(),
                    })
                  }
                >
                  {
                    (formik) => (
                      <Form>
                        <div className="grid gap-5 md:grid-cols-1 py-4">
                          {/* Order Type */}
                          <div>
                            <label className="block text-slate-800 font-semibold mb-4" htmlFor="order_type">Order Type</label>
                            <Field name="order_type" as="select" className="form-select w-full">
                              <option value="">Pick Something</option>
                              <option value="restaurant">On Restaurant</option>
                              <option value="pick_up">Pick up</option>
                              <option value="shipment">Shipment</option>
                            </Field>
                            <ErrorMessage name="order_type" component="div" className="text-xs mt-1 text-rose-500" />
                          </div>
                          {/* Code Table */}
                          {
                            (formik.values.order_type === 'restaurant') && // show Field if order_type is restaurant
                            <div>
                              <label className="block text-slate-800 font-semibold mb-4" htmlFor="table_code">Table Code</label>
                              <Field name="table_code" type="number" className="form-input w-full" placeholder="4 digit code" />
                              <ErrorMessage name="table_code" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                          }
                          {/* Order Note */}
                          <div>
                            <label className="block text-slate-800 font-semibold mb-4" htmlFor="note">Order Note</label>
                            <Field name="note" type="text" as="textarea" className="form-input w-full" placeholder="This note will be seen by the cooks, you can specify the details of your order" />
                            <ErrorMessage name="note" component="div" className="text-xs mt-1 text-rose-500" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <SpinnerButton
                            classNameEnable="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                            classNameDisabled="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="submit"
                            isLoading={isLoading}
                            value={`Continue - $${grant_total}`}
                          />
                        </div>
                      </Form>
                    )
                  }
                </Formik>      
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
