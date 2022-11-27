import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { SpinnerButton } from '../../../../components/items/Spinner';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../../store/slices/categories';

const MySwal = withReactContent(Swal);

export const CategoryModal = ({ open, setOpen, categorySelected }) => {

  // get data from category selected 
  const {id=null, name=""} = categorySelected

  // check if is Add or Update and set the variables
  const [triggerMutation,  {isLoading}] =  id ? useUpdateCategoryMutation() : useCreateCategoryMutation()
  const actionName =  id ? "Update" : "Add"
  const actionNameSuccess =  id ? "updated" : "added"

  
  // error on api cal for register customer
  const showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error?.data?.detail,
    })
  }

  // function for show success to user 
  const showSuccess = () => {
    Swal.fire({
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
                    <div className="">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{actionName} Category</h2>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Category
                        </h3>

                        {/* Form */}
                        <Formik
                          initialValues={{
                            name: name,
                          }}
                          onSubmit={ async (values) => {
                            // prepare json request for backend
                            const apiData = {
                              id: id,
                              name: values.name
                            }
                            // make api request
                            const {data, error} = await triggerMutation(apiData)
                            if (data) showSuccess()
                            else showError(error)
                          }}
                          validationSchema={
                            Yup.object({
                              name: Yup.string()
                                .required('Required')
                            })
                          }
                        >

                          {
                            (formik) => (
                              <Form>
                                <div className="">
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="email">Name <span className="text-rose-500">*</span></label>
                                    <Field name="name" type="text" className="form-input w-full" />
                                    <ErrorMessage name="name" component="span" className="text-rose-500 text-sm" />
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
