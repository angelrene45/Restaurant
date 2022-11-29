import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import React from 'react'
import { SpinnerButton } from '../../../../components/items/Spinner';

export const AddressFormik = ({ address = {} }) => {

    const {
        street = "",
        city = "",
        state = "",
        country = "",
        postal_code = "",
    } = address

    return (
        <Formik
            initialValues={{
                street,
                city,
                state,
                country,
                postal_code
            }}
            onSubmit={async (values) => {
                console.log(values)
            }}
            validationSchema={
                Yup.object({
                    street: Yup.string()
                        .required('Required'),
                    city: Yup.string()
                        .required('Required'),
                    state: Yup.string()
                        .required('Required'),
                    country: Yup.string()
                        .required('Required'),
                    postal_code: Yup.string()
                        .required('Required'),
                })
            }
        >

            {
                (formik) => (
                    <Form>
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {/* street */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="street">Street</label>
                                <Field name="street" type="text" className="form-input w-full" />
                                <ErrorMessage name="street" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                            {/* city */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                                <Field name="city" type="text" className="form-input w-full" />
                                <ErrorMessage name="city" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                            {/* state */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                                <Field name="state" type="text" className="form-input w-full" />
                                <ErrorMessage name="state" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                            {/* country */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                                <Field name="country" type="text" className="form-input w-full" />
                                <ErrorMessage name="country" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                            {/* postal_code */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="postal_code">Postal code</label>
                                <Field name="postal_code" type="text" className="form-input w-full" />
                                <ErrorMessage name="postal_code" component="div" className="text-xs mt-1 text-rose-500" />
                            </div>
                        </div>
                        {/* Button Submit */}
                        <div className="flex items-center justify-between mt-6">
                            <div className="mr-6"></div>
                            <SpinnerButton
                                classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                                classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="submit"
                                isLoading={false}
                                value="New address"
                            />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}
