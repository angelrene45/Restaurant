import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { useCreateCustomerOpenMutation } from '../../store/slices/customers/api';
import { getToken } from '../../store/slices/auth';
import { navigateUser } from '../../utils';
import { SpinnerButton } from '../../components/items/Spinner';

const MySwal = withReactContent(Swal);

export const RegisterCustomerPage = () => {

  // get redux state from authentication
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  // mutation for call api (create customer)
  const [createCustomerOpen,  {isLoading, error}] = useCreateCustomerOpenMutation();

  // error on api cal for register customer
  if (error){ 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.data.detail,
    })
  }

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
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Create your Account ✨</h1>
              {/* Form */}
              <Formik
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  password: '',
                  passwordConfirm: '',
                }}
                onSubmit={async (values) => {
                  // prepare object to backend
                  const apiData = {
                    email: values.email,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    password: values.password
                  }
                  // call api create customer open and await for response
                  const {data, error} = await createCustomerOpen(apiData);
                  // check if customer is created
                  if (data){
                    // here the sign up was success so auto sign in 
                    dispatch( getToken(values.email, values.password, "customer") )
                  }
                }}
                validationSchema={
                  Yup.object({
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Required'),
                    firstName: Yup.string()
                      .max(20, 'Must be 20 characters or less')
                      .required('Required'),
                    lastName: Yup.string()
                      .max(20, 'Must be 20 characters or less')
                      .required('Required'),
                    password: Yup.string()
                      .required('Required'),
                    passwordConfirm: Yup.string()
                      .required('Required')
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                          <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name <span className="text-rose-500">*</span></label>
                          <Field name="firstName" type="text" className="form-input w-full" />
                          <ErrorMessage name="firstName" component="span" className="text-rose-500 text-sm"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
                          <Field name="lastName" type="text" className="form-input w-full" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-rose-500">*</span></label>
                          <Field name="password" type="password" className="form-input w-full" />
                          <ErrorMessage name="password" component="span" className="text-rose-500 text-sm"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="passwordConfirm">Confirm Password<span className="text-rose-500">*</span></label>
                          <Field name="passwordConfirm" type="password" className="form-input w-full" />
                          <ErrorMessage name="passwordConfirm" component="span" className="text-rose-500 text-sm"/>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="mr-6"></div>
                        <SpinnerButton
                          classNameEnable="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" 
                          classNameDisabled="btn text-white ml-3 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" 
                          type="submit"
                          isLoading={isLoading}
                          value="Sign Up"
                        />
                      </div>
                    </Form>
                  )
                }
              </Formik>
              
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/auth/login/customer">Sign In</Link>
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