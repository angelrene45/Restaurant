import { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { SpinnerButton } from '../../../components/items/Spinner'
import { useUpdateCustomerMeMutation } from '../../../store/slices/customers/api';
import { setUserData } from '../../../store/slices/auth/authSlice';

const MySwal = withReactContent(Swal);

export const AddressCreateModal = () => {

  const { status, userData } = useSelector((state) => state.auth);

  const [updateCustomerMe, { isLoading }] = useUpdateCustomerMeMutation();

  const initialValues = {
    street: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    update_account: true
  }
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  // button when customer click on make order
  const submitForm = async (formData, { resetForm }) => {
    // check if address not repeat with current addresses
    const existAddress = validateAddress(formData)
    // address already exists
    if (existAddress) {
      showMessage("The address already exists in your account")
      return
    }

    // Add new address to customer account
    if (status === 'authenticated' & formData.update_account) {

      // get current user address
      const addresses = [...userData.addresses, formData]

      // new user data 
      const newUserData = { ...userData, addresses }

      // update user data from Api 
      const { data, error } = await updateCustomerMe(newUserData)

      // success update
      if (data) {
        // update redux state with new user data and auto re-rendering from AddressesCustomer component
        dispatch(setUserData({ userData: data }))
        setOpen(false)
      } else {
        showMessage(error.error?.data?.detail)
      }
    }
    // Customer or Guest only want to use this address once
    else {
      // clone current data 
      let data = { ...userData }
      // scenario for customer authenticated and checkbox false
      if (data.addresses) data.addresses = [...data.addresses, formData]
      // scenario for guest and checkbox false
      else data.addresses = [formData]
      // update redux state and auto re-rendering from AddressesCustomer component 
      dispatch(setUserData({ userData: data }))
      setOpen(false)
    }
    // clear data in form
    resetForm()
  }

  const validateAddress = (formData) => {
    const existAddress = userData.addresses?.find(
      address =>
        address.street.toLowerCase() === formData.street.toLowerCase() &&
        address.city.toLowerCase() === formData.city.toLowerCase() &&
        address.state.toLowerCase() === formData.state.toLowerCase() &&
        address.country.toLowerCase() === formData.country.toLowerCase() &&
        address.postal_code.toLowerCase() === formData.postal_code.toLowerCase()
    )
    return existAddress ? true : false
  }

  const showMessage = (msg) => {
    MySwal.fire({
      icon: 'info',
      title: '',
      text: msg,
      showConfirmButton: true,
    })
  }

  return (
    <>
      {/* Button Icon */}
      <button
        type="button"
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-3"
        onClick={() => setOpen(true)}
      >
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
        </svg>
        <span className="ml-2">Add Address</span>
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
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
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

                    <div className="grid w-full grid-cols-1 items-start">
                      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Add Address</h2>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <h3 id="options-heading" className="sr-only">
                            Address
                          </h3>

                          {/* Form */}
                          <Formik
                            initialValues={{ ...initialValues }}
                            onSubmit={submitForm}
                            validationSchema={
                              Yup.object({
                                street: Yup.string().required('Required'),
                                city: Yup.string().required('Required'),
                                state: Yup.string().required('Required'),
                                country: Yup.string().required('Required'),
                                postal_code: Yup.string().required('Required').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
                                update_account: Yup.boolean().oneOf([true, false]),

                              })
                            }
                          >

                            {
                              (formik) => (
                                <Form>
                                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {/* street */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1" htmlFor='street'>Street</label>
                                      <Field name='street' type="text" className="form-input w-full" placeholder="8 My Street" />
                                      <ErrorMessage name='street' component="div" className="text-xs mt-1 text-rose-500" />
                                    </div>

                                    {/* city */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1" htmlFor='city'>City</label>
                                      <Field name='city' type="text" className="form-input w-full" placeholder="New York" />
                                      <ErrorMessage name='city' component="div" className="text-xs mt-1 text-rose-500" />
                                    </div>

                                    {/* state */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1" htmlFor='state'>State</label>
                                      <Field name='state' type="text" className="form-input w-full" placeholder="NY" />
                                      <ErrorMessage name='state' component="div" className="text-xs mt-1 text-rose-500" />
                                    </div>

                                    {/* country */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1" htmlFor='country'>Country</label>
                                      <Field name='country' type="text" className="form-input w-full" placeholder="USA" />
                                      <ErrorMessage name='country' component="div" className="text-xs mt-1 text-rose-500" />
                                    </div>

                                    {/* postal_code */}
                                    <div>
                                      <label className="block text-sm font-medium mb-1" htmlFor='postal_code'>Postal Code</label>
                                      <Field name='postal_code' type="text" className="form-input w-full" placeholder="10014" />
                                      <ErrorMessage name='postal_code' component="div" className="text-xs mt-1 text-rose-500" />
                                    </div>

                                    {/* Update Account */}
                                    {(status === 'authenticated') &&
                                      // if customer is authenticated show this checkbox
                                      <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="update_account">Update Account</label>
                                        <Field name="update_account" type="checkbox" className="form-checkbox" title="This Address will be inserted into your account" />
                                        <ErrorMessage name="update_account" component="div" className="text-xs mt-1 text-rose-500" />
                                      </div>
                                    }

                                  </div>

                                  {/* Button Submit */}
                                  <div className="flex items-center justify-between mt-6">
                                    <div className="mr-6"></div>
                                    <SpinnerButton
                                      classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                                      classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                      type="submit"
                                      isLoading={isLoading}
                                      value="Add"
                                    />
                                  </div>
                                </Form>
                              )
                            }
                          </Formik>
                        </section>
                      </div>
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
