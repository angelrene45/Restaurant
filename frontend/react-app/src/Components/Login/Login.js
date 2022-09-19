import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Types from '../../store/Types'


const Login = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.LoginReducer)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthModeHandler = async (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("'Access-Control-Allow-Origin", "*")

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "admin@admin.com");
    urlencoded.append("password", "admin");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch("http://127.0.0.1:8000/api/v1/login/access-token", requestOptions);
    const data = await response.json();
    console.log(data)
    localStorage.setItem("TOKEN", data.access_token );
    dispatch({ type: Types.setToken, payload: data.access_token})
    
    
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
    <section >
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={switchAuthModeHandler}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={email} onChange={handleEmail}/>
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required value={password} onChange={handlePassword}/>
        </div>
        <div>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
