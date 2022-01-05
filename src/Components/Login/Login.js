import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import Logo from '../../olx-logo.png';
import { INPUT_HANDLER } from '../../validation/inputHander';
import { LOGIN } from "../../Constants/constants";

/* configured global context */
import axios from '../../Config/axios';
import { useGlobalContext } from "../../Config/globalContext";

const defaultFormData = {
  email: {
    value: "",
    errorStatus: false,
    error: ""
  },
  password: {
    value: "",
    errorStatus: false,
    error: ""
  }
}

function Login() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData)
  const { email, password } = formData;

  const { dispatch } = useGlobalContext();

  const inputHandler = (e) => INPUT_HANDLER(e, setFormData);

  const formHandler = (e) => {
    e.preventDefault();

    if ((email.errorStatus === true) || (password.errorStatus === true)) {
      setError("Invalid Credential");
      return setTimeout(() => setError(""), 3000);
    }
    
    let data = {
      email: email.value,
      password: password.value,
    }

    axios.post("/login", data, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        validateStatus: (status) => status < 500
      })
      .then(async (data) => {
        if (data.status >= 400) {
          setError(data.data.message);
          return setTimeout(() => setError(""), 3000);
        }

        if (data.status === 200) {
          const { user, userAccessToken } = data.data;
          dispatch({ type: LOGIN, payload: { user, userAccessToken } });
          window.location.href = "/";
        }
      })
      .catch(err => {
        setError("Invalid Credential");
        return setTimeout(() => setError(""), 3000);
      });
  }


  return (
    <div>
      <div className="loginParentDiv">
        <div className='loginImgContainer'>
          <img src={Logo} alt='OLX ogo'/>
        </div>
        <form onSubmit={formHandler}>
          {
            error && <p style={{
              width: "100%",
              color: "red",
              fontWeight: "600",
              border: "1px solid red",
              padding: "0.2rem",
              fontStyle: "italic"
            }}>{error}</p>
          }

          <label htmlFor="emailInput">Email</label><br />
          <input className="input" id="emailInput" 
            type="email" name="email" onChange={inputHandler} />
          {email.errorStatus && <p className="errorSignup">{email.error}</p>}
          <br />
          
          <label htmlFor="passwordInput">Password</label><br />
          <input className="input" id="passwordInput" 
            type="password" name="password" onChange={inputHandler} />
          {password.errorStatus && <p className="errorSignup">{password.error}</p>}
          <br /><br />
          
          <button>Login</button>
        </form>
        <Link className='createAnAccount' to='/signup'>create an account?</Link>
      </div>
    </div>
  );
}

export default Login;
