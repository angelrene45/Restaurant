import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import React from 'react';
import loginImg from '../../images/login2.jpg';
import { navigateUser } from '../../utils';
import { getToken } from '../../store/slices/auth';
import { SpinnerButton } from '../../components/items/Spinner';


export const LoginUserPage = (props) => {

  const dispatch = useDispatch();

  // if user is already authenticated redirect to proper page 
  const { status } = useSelector(state => state.auth);
  if (status === 'authenticated') return navigateUser()

  let isAuthenticating = status === 'checking' ? true : false

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className='w-screen bg-gray-800 flex flex-col justify-center'>
        {/* Form */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            dispatch(getToken(values.email, values.password, "user"))
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
              <Form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                  <h2 className='text-4xl dark:text-white font-bold text-center'>Login
                    <div className='hidden sm:block'>
                      <img className='w-screen h-fit justify-around object-fixed bg-gray-800' src={loginImg} alt='' />
                    </div>
                  </h2>

                  <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor='email'>User/Email</label>
                    <Field name="email" type="email" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' />
                    <ErrorMessage name="email" component="div" className="text-xs mt-1 text-rose-500" />
                  </div>
                  <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <Field name="password" type="password" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' />
                    <ErrorMessage name="password" component="div" className="text-xs mt-1 text-rose-500" />
                  </div>
                  <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me </p>
                    <button className='hover:text-slate-200'>Forgot Password</button>
                  </div>
                  <SpinnerButton
                    classNameEnable="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
                    classNameDisabled="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
                    type="submit"
                    isLoading={isAuthenticating}
                    value="Log In"
                  />
              </Form>
            )
          }
        </Formik>

      </div>
    </div>
  )
};