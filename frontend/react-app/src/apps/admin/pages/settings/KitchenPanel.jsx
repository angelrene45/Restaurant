import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import { useGetSettingsByNameQuery, useUpdateSettingMutation } from "../../../../store/slices/settings";
import { Loading, SpinnerButton } from "../../../../components/items/Spinner";
import { useGetAllCategoriesQuery } from "../../../../store/slices/categories/api";
import { MultiSelectFormik } from "../../../../components/formik/MultiSelectFormik";
import { CheckBoxFormik } from "../../../../components/formik/CheckBoxFormik";
import { displayMessage } from '../../../../utils/swalMsg';


export const KitchenPanel = () => {


  const { data: dataKitchen = {}, isLoading: loadingSettingsKitchen } = useGetSettingsByNameQuery('kitchen');
  const { data: categories = [], isLoading: loadingCategories } = useGetAllCategoriesQuery();
  const [updateSettings, { isLoading }] = useUpdateSettingMutation();

  // Loading settings and categories from API
  if (loadingSettingsKitchen || loadingCategories) return <Loading />

  // create option from react select format 
  const optionsCategories = categories.map((category) => {
    return { value: category.id, label: category.name };
  })

  return (
    <div className="grow">

      {/* Form */}
      <Formik
        initialValues={{
          drinks_tab: dataKitchen?.value?.drinks_tab,
          drinks_categories: dataKitchen?.value?.drinks_categories,
        }}
        onSubmit={async (values) => {          
          const apiData = {
            name: "kitchen",
            value: values
          }
          // make api request
          const { data, error } = await updateSettings(apiData);
          if (data) displayMessage("Settings has been saved", "info", { showConfirmButton: false, timer: 1500 })
          else displayMessage("Error when try to saved data", "error")
        }}
        validationSchema={
          Yup.object({
            drinks_tab: Yup.boolean()
              .oneOf([true, false]),
            drinks_categories: Yup.array()
              .min(1, 'Pick at least one item')
          })
        }
      >
        {
          (formik) => (
            <Form>
              {/* Panel body */}
              <div className="p-6 space-y-6">
                <h2 className="text-2xl text-slate-800 font-bold mb-5">Kitchen</h2>
                <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-1">

                  {/* CheckBox Enable Drinks Tab*/}
                  <div>
                    <ul>
                      <li className="flex justify-between items-center py-3 border-b border-slate-200">
                        {/* Left */}
                        <div>
                          <div className="text-slate-800 font-semibold">Enable Drinks Tab</div>
                          <div className="text-sm">This option enables the drinks tab on the kitchen page and the status of the screens will be used to finalize an order</div>
                        </div>
                        {/* Right */}
                        <div>
                          <Field
                            id="drinks_tab"
                            name="drinks_tab"
                            component={CheckBoxFormik}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* MultiSelect Categories */}
                  <div>
                    <Field
                      name="drinks_categories"
                      id="drinks_categories"
                      placeholder="Categories"
                      isMulti={true}
                      component={MultiSelectFormik}
                      options={optionsCategories}
                    />
                    <ErrorMessage name="drinks_categories" component="div" className="text-xs mt-1 text-rose-500" />
                  </div>

                </div>
              </div>

              {/* Panel footer */}
              <footer>
                <div className="flex flex-col px-6 py-5 border-t border-slate-200">
                  <div className="flex self-end">
                    <SpinnerButton
                      classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                      classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      type="submit"
                      isLoading={isLoading}
                      value="Save Changes"
                    />
                  </div>
                </div>
              </footer>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

