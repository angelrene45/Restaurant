import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';


import React from 'react';
import loginImg from '../../assets/login2.jpg';
import Types from '../../store/Types';


const Login = (props) => {
    
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const dispatch = useDispatch();

    const token = localStorage.getItem('TOKEN');
    const role = localStorage.getItem('ROLE');


    if (token !== null) {
      dispatch({ type: Types.setToken, payload: { token, role } });
    };



    const switchAuthModeHandler = async (event) => {
      event.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Accept", "application/json");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", enteredEmail);
      urlencoded.append("password", enteredPassword);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      };
      try {
        const response = await fetch("http://localhost:8000/api/v1/login/access-token", requestOptions);
        if (response.ok) {
          const data = await response.json()    
          dispatch({ type: Types.setToken, payload: { token: data.access_token, role: data.user_data.role }});
          localStorage.setItem('TOKEN', data.access_token);
          localStorage.setItem('ROLE', data.user_data.role);
        } else {

          throw new Error("Invalid credentials")
        }
        
      } catch(e) {
        //mostrar error
        window.alert(e)
      }
    };


  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">  
          <div className='w-screen bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={switchAuthModeHandler}>
              <h2 className='text-4xl dark:text-white font-bold text-center'>{isLogin ? 'Login' : 'Sign Up'}
                <div className='hidden sm:block'>
                  <img className='w-screen h-fit justify-around object-fixed bg-gray-800' src={loginImg} alt='' />
                </div>
              </h2>

              <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor='email'>Usuario/Email</label>
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


export default Login;
