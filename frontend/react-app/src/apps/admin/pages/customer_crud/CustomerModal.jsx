import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { SpinnerButton } from '../../../../components/items/Spinner';

const MySwal = withReactContent(Swal);

export const CustomerModal = ({
  open,
  setOpen,
  itemSelected,
  useCreateMutation,
  useUpdateMutation
}) => {

  // get data from category selected 
  let {
    id = "",
    email = "",
    mobile = "",
    first_name = "",
    last_name = "",
    password = "",
    is_active = true,
    addresses = []
  } = itemSelected

  // replace null value for empty string (avoid error with initValues formik with null)
  mobile = mobile ? mobile : ""
  first_name = first_name ? first_name : ""
  last_name = last_name ? last_name : ""

  // check if is Add or Update and set the variables
  const [triggerMutation, { isLoading }] = id ? useUpdateMutation() : useCreateMutation()
  const actionName = id ? "Update" : "Add"
  const actionNameSuccess = id ? "updated" : "added"

  // error on api cal for register customer
  const showError = (error) => {
    // multiple error messages 
    if (Array.isArray(error?.data?.detail)) {
      let msgError = ""
      error.data.detail.forEach(element => {
        msgError += `${element?.msg} `
      });

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msgError,
      })
    }

    // only one error message 
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.data?.detail,
      })
    }

  }

  // function for show success to user 
  const showSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: `Customer has been ${actionNameSuccess}`,
      showConfirmButton: false,
      timer: 1500
    })
    setOpen(false)
  }


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
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{actionName} Customer</h2>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Customer
                        </h3>

                        {/* Form */}
                        <Formik
                          initialValues={{
                            id,
                            email,
                            mobile,
                            first_name,
                            last_name,
                            password,
                            is_active,
                            addresses
                          }}
                          onSubmit={async (values) => {
                            // make api request
                            const { data, error } = await triggerMutation(values)
                            if (data) showSuccess()
                            else showError(error)
                          }}
                          validationSchema={
                            Yup.object({
                              email: Yup.string()
                                .required('Required'),
                              mobile: Yup.string()
                                .nullable(),
                              password: Yup.string()
                                .when("dummy", {
                                  is: (value) => actionName === "Add",
                                  then: Yup.string().required('Required'),
                                }),
                              is_active: Yup.boolean()
                                .oneOf([true, false]),
                              addresses: Yup.array()
                                .of(
                                  Yup.object().shape({
                                    street: Yup.string().required('Required'),
                                    city: Yup.string().required('Required'),
                                    state: Yup.string().required('Required'),
                                    country: Yup.string().required('Required'),
                                    postal_code: Yup.string().required('Required').min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
                                  })
                                )
                            })
                          }
                        >

                          {
                            (formik) => (
                              <Form>
                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                  {/* Email */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-rose-500">*</span></label>
                                    <Field name="email" type="email" className="form-input w-full" />
                                    <ErrorMessage name="email" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* Mobile */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="mobile">Mobile</label>
                                    <Field name="mobile" type="text" className="form-input w-full" />
                                    <ErrorMessage name="mobile" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* First Name */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="first_name">First Name</label>
                                    <Field name="first_name" type="text" className="form-input w-full" />
                                    <ErrorMessage name="first_name" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* Last Name */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="last_name">Last Name</label>
                                    <Field name="last_name" type="text" className="form-input w-full" />
                                    <ErrorMessage name="last_name" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* Password */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                    <Field name="password" type="password" className="form-input w-full" />
                                    <ErrorMessage name="password" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* Is Active */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="is_active">Is Active<span className="text-rose-500">*</span></label>
                                    <Field name="is_active" type="checkbox" className="form-checkbox" />
                                    <ErrorMessage name="is_active" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                </div>

                                {/* Addresses */}
                                <div className='py-4'>
                                  <label className="text-sm font-medium mb-1" htmlFor="role">Addresses</label>
                                  <FieldArray name="addresses">
                                    {({ insert, remove, push }) => (
                                      <div className=''>
                                        {formik.values.addresses.length > 0 &&
                                          formik.values.addresses.map((address, index) => (
                                            <div className="bg-slate-100 mt-4" key={index}>
                                              <label className="text-sm font-bold mb-1" htmlFor="role">Address {index + 1}</label>
                                              <div className="py-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                                {/* street */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1" htmlFor={`addresses.${index}.street`}>Street</label>
                                                  <Field name={`addresses.${index}.street`} type="text" className="form-input w-full" placeholder="8 My Street" />
                                                  <ErrorMessage name={`addresses.${index}.street`} component="div" className="text-xs mt-1 text-rose-500" />
                                                </div>

                                                {/* city */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1" htmlFor={`addresses.${index}.city`}>City</label>
                                                  <Field name={`addresses.${index}.city`} type="text" className="form-input w-full" placeholder="New York" />
                                                  <ErrorMessage name={`addresses.${index}.city`} component="div" className="text-xs mt-1 text-rose-500" />
                                                </div>

                                                {/* state */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1" htmlFor={`addresses.${index}.state`}>State</label>
                                                  <Field name={`addresses.${index}.state`} type="text" className="form-input w-full" placeholder="NY" />
                                                  <ErrorMessage name={`addresses.${index}.state`} component="div" className="text-xs mt-1 text-rose-500" />
                                                </div>

                                                {/* country */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1" htmlFor={`addresses.${index}.country`}>Country</label>
                                                  <Field name={`addresses.${index}.country`} type="text" className="form-input w-full" placeholder="USA" />
                                                  <ErrorMessage name={`addresses.${index}.country`} component="div" className="text-xs mt-1 text-rose-500" />
                                                </div>

                                                {/* postal_code */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1" htmlFor={`addresses.${index}.postal_code`}>Postal Code</label>
                                                  <Field name={`addresses.${index}.postal_code`} type="text" className="form-input w-full" placeholder="10014" />
                                                  <ErrorMessage name={`addresses.${index}.postal_code`} component="div" className="text-xs mt-1 text-rose-500" />
                                                </div>

                                                {/* Remove Address */}
                                                <div>
                                                  <label className="block text-sm font-medium mb-1">Action</label>
                                                  <button
                                                    type="button"
                                                    className="btn border-slate-200 hover:border-slate-300 text-rose-500 bg-slate-50"
                                                    onClick={() => remove(index)}
                                                  >
                                                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                                      <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                                                    </svg>
                                                    <span className="ml-2">Delete</span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        {/* Add new Address */}
                                        <button
                                          type="button"
                                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-3"
                                          onClick={() => push({ street: "", city: "", state: "", country: "", postal_code: "" })}
                                        >
                                          <svg
                                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                                          </svg>
                                          <span className="ml-2">Add Address</span>
                                        </button>
                                      </div>
                                    )}
                                  </FieldArray>

                                </div>

                                {/* Button Submit */}
                                <div className="flex items-center justify-between mt-6">
                                  <div className="mr-6"></div>
                                  <SpinnerButton
                                    classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                                    classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="submit"
                                    isLoading={isLoading}
                                    value={actionName}
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
  )
}
