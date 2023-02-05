import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { SpinnerButton, Loading } from '../../../../components/items/Spinner';
import { useGetSettingsByNameQuery, useUpdateSettingMutation } from "../../../../store/slices/settings";
import { displayMessage } from '../../../../utils/swalMsg';



export const AccountPanel = () => {

  // get data from api
  const { data, isLoading: loadingSettingsAccount } = useGetSettingsByNameQuery('account');
  const [updateSettings, { isLoading }] = useUpdateSettingMutation();

  if (loadingSettingsAccount) return <Loading/>
  
  return (
    <div className="grow">
      {/* Form */}
      <Formik
        initialValues={{
          name: data?.value?.name,
          email: data?.value?.email,
          location: data?.value?.location
        }}
        onSubmit={async (values) => {
          const apiData = {
            name: "account",
            value: values
          }
          // make api request
          const { data, error } = await updateSettings(apiData);
          if (data) displayMessage("Settings has been saved", "info", { showConfirmButton: false, timer: 1500 })
          else displayMessage("Error when try to saved data", "error")
        }}
        validationSchema={
          Yup.object({
            name: Yup.string()
              .required('Required'),
            email: Yup.string()
              .nullable(),
            location: Yup.string()
              .nullable(),
          })
        }
      >
        {
          (formik) => (
            <Form>
              {/* Panel body */}
              <div className="p-6 space-y-6">
                <h2 className="text-2xl text-slate-800 font-bold mb-5">Account</h2>
                {/* Business Profile */}
                <section>
                  <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Business Profile</h2>
                  <div className="text-sm pb-4">Here you can change the info for business account.</div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Business Name</label>
                      <Field name="name" type="text" className="form-input w-full" />
                      <ErrorMessage name="name" component="div" className="text-xs mt-1 text-rose-500" />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                      <Field name="location" type="location" className="form-input w-full" />
                      <ErrorMessage name="location" component="div" className="text-xs mt-1 text-rose-500" />
                    </div>
                  </div>
                </section>

                {/* Email */}
                <section>
                  <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Email</h2>
                  <div className="text-sm">Official business mail.</div>
                  <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-1">
                    <div className="mr-2">
                      <label className="sr-only" htmlFor="email">Business email</label>
                      <Field name="email" type="email" className="form-input w-full" />
                      <ErrorMessage name="email" component="div" className="text-xs mt-1 text-rose-500" />
                    </div>
                  </div>
                </section>
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
  );
}
