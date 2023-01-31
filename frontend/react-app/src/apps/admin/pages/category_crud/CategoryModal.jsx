import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { SpinnerButton } from '../../../../components/items/Spinner';

const MySwal = withReactContent(Swal);

export const CategoryModal = ({
  open,
  setOpen,
  itemSelected,
  useCreateMutation,
  useUpdateMutation
}) => {

  // get data from category selected 
  const { id = null, name = "", color = "" } = itemSelected

  // check if is Add or Update and set the variables
  const [triggerMutation, { isLoading }] = id ? useUpdateMutation() : useCreateMutation()
  const actionName = id ? "Update" : "Add"
  const actionNameSuccess = id ? "updated" : "added"

  // error on api cal for register customer
  const showError = (error) => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error?.data?.detail,
    })
  }

  // function for show success to user 
  const showSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: `Category has been ${actionNameSuccess}`,
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

                  <div className="grid w-full grid-cols-1 items-start ">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{actionName} Category</h2>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Category
                        </h3>

                        {/* Form */}
                        <Formik
                          initialValues={{
                            name: name,
                            color: color
                          }}
                          onSubmit={async (values) => {
                            // prepare json request for backend
                            const apiData = {
                              id: id,
                              name: values.name,
                              color: values.color
                            }
                            // make api request
                            const { data, error } = await triggerMutation(apiData)
                            if (data) showSuccess()
                            else showError(error)
                          }}
                          validationSchema={
                            Yup.object({
                              name: Yup.string()
                                .required('Required'),
                              color: Yup.string()
                                .required('Required')
                            })
                          }
                        >

                          {
                            (formik) => (
                              <Form>
                                <div className="grid gap-5 md:grid-cols-2">
                                  {/* Name */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
                                    <Field name="name" type="text" className="form-input w-full" />
                                    <ErrorMessage name="name" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                  {/* Color */}
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="color">Color<span className="text-rose-500">*</span></label>
                                    <Field name="color" as="select" className={`form-select ${formik.values.color}`}>
                                      <option value="">Pick a color</option>
                                      <option className="bg-gray-200" value="bg-gray-200">Gray</option>
                                      <option className="bg-red-300" value="bg-red-300">Red</option>
                                      <option className="bg-orange-200" value="bg-orange-200">Orange</option>
                                      <option className="bg-green-200" value="bg-green-200">Green</option>
                                      <option className="bg-blue-300" value="bg-blue-300">Blue</option>
                                      <option className="bg-yellow-200" value="bg-yellow-200">Yellow</option>
                                      <option className="bg-purple-300" value="bg-purple-300">Purple</option>
                                      <option className="bg-pink-300" value="bg-pink-300">Pink</option>
                                    </Field>
                                    <ErrorMessage name="color" component="div" className="text-xs mt-1 text-rose-500" />
                                  </div>
                                </div>
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
