import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { getToken } from '../../store/slices/auth';
import { navigateUser } from '../../utils';
import { SpinnerButton } from '../../components/items/Spinner';

export const LoginCustomerPage = () => {

  const {status} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  // this memo disable button when is checking credentials to backend 
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  // if user is authenticated navigate to home 
  if (status === 'authenticated') return navigateUser()

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome! ✨</h1>
              {/* Form */}
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={ (values) => {
                  dispatch( getToken(values.email, values.password, "customer") )
                }}
                validationSchema={
                  Yup.object({
                    email: Yup.string()
                      .required('Required')
                      .email('Invalid email address'),
                    password: Yup.string()
                      .required('Required')
                  })
                }
              >

                {
                  (formik) => (
                    <Form>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
                          <Field name="email" type="email" className="form-input w-full" />
                          <ErrorMessage name="email" component="span" className="text-rose-500 text-sm"/>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-rose-500">*</span></label>
                          <Field name="password" type="password" className="form-input w-full" />
                          <ErrorMessage name="password" component="span" className="text-rose-500 text-sm"/>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="mr-6"></div>
                        <SpinnerButton
                          classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" 
                          classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" 
                          type="submit"
                          isLoading={isAuthenticating}
                          value="Log In"
                        />
                      </div>
                    </Form>
                  )
                }
              </Formik>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Don't you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/auth/register/customer">Sign Up</Link>
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">
                    <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      To support you contact from test@email.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>

      </div>

    </main>
  );
}