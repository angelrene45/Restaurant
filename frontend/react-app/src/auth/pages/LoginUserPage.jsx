import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import React from 'react';
import loginImg from '../../images/login2.jpg';
import { navigateUser } from '../../utils';
import { getToken, setToken } from '../../store/slices/auth';


export const LoginUserPage = (props) => {
    
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();

    // if user is already authenticated redirect to proper page 
    const {status} = useSelector(state => state.auth);
    if (status === 'authenticated') return navigateUser()

    
    const loginHandler = async (event) => {
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value
      dispatch( getToken(enteredEmail, enteredPassword, "user") )
    };

  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">  
          <div className='w-screen bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={loginHandler}>
              <h2 className='text-4xl dark:text-white font-bold text-center'>{isLogin ? 'Login' : 'Sign Up'}
                <div className='hidden sm:block'>
                  <img className='w-screen h-fit justify-around object-fixed bg-gray-800' src={loginImg} alt='' />
                </div>
              </h2>

              <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor='email'>User/Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" id='email' required  ref={emailInputRef} />
              </div>
              <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" id='password' required ref={passwordInputRef}/>
              </div>
              <div className='flex justify-between text-gray-400 py-2'>
                <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me </p>
                <button className='hover:text-slate-200'>Forgot Password</button>
              </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg'>
                  {isLogin ? 'Login' : 'Create Account'}
                </button>
                <button type='button'>
                  {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </form>
        </div>
    </div>
  )
};