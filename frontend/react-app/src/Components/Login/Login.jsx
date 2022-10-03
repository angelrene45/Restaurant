import React from 'react';
import loginImg from '../../assets/login2.jpg';
import { useState } from 'react';

export default function Login() {
    
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const switchAuthModeHandler = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password })
        };
        const result = await fetch('http://localhost:8000/api/v1/login/access-token', requestOptions)
        console.log(result.json)
      };

    const handleEmail = (event) => {
        setEmail(event.target.value)
        console.log(email)
      };
    
      const handlePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
      };
  
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        
        
        <div className='w-screen bg-gray-800 flex flex-col justify-center'>
        
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                <h2 className='text-4xl dark:text-white font-bold text-center'>{isLogin ? 'Login' : 'Sign Up'}
                <div className='hidden sm:block'>
            <img className='w-screen h-fit justify-around object-fixed bg-gray-800' src={loginImg} alt='' />
                </div></h2>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label htmlFor='email'>Usuario/Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" id='email' required value={email} onChange={handleEmail} />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" id='passord' required value={password} onChange={handlePassword} />
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me </p>
                    <button className='hover:text-slate-200'>Forgot Password</button>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg' >{isLogin ? 'Login' : 'Create Account'}</button>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg'
            type='button'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
            </form>
        </div>
    </div>
)
}