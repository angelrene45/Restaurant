import { useState } from 'react';



const Login = () => {
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
    <section >
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
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
          <button
            type='button'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
