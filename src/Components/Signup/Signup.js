import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';

import { INPUT_HANDLER } from '../../validation/inputHander';
import axios from '../../Config/axios';
import Loading from '../Loading';

const defaultFormData = {
  name: {
    value: "",
    errorStatus: false,
    error: ""
  },
  email: {
    value: "",
    errorStatus: false,
    error: ""
  },
  phone: {
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

export default function Signup() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);
  const { name, email, phone, password } = formData;

  const [status, setStatus] = useState({ loading: false, alert: false, alertMsg: "" });
  const { loading, alert, alertMsg } = status;

  // input handler
  const inputHandler = (e) => INPUT_HANDLER(e, setFormData);

  // from submit handler
  const formHandler = (e) => {
    e.preventDefault();

    if ((name.errorStatus === true) || (email.errorStatus === true) || (phone.errorStatus === true) || (password.errorStatus === true)){
      setError("Invalid Credential");
      return setTimeout(() => setError(""), 5000);
    }
    
    let data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    }

    setStatus({ loading: true, alert: false, alertMsg: "", alertStatus: false });
    axios.post("/signup", data,
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        validateStatus: function (status) {
          return status < 500;
        }
      })
      .then(data => {
        if (data.status >= 400 || data.status === 208) {
          setStatus({ loading: false, alert: false, alertMsg: "" })
          setError(data.data.message);
          return setTimeout(() => setError(""), 3000);
        }
        setFormData(defaultFormData);
        setStatus({ loading: false, alert: true, alertMsg: data.data.message })
        return setTimeout(() => {
          setStatus({ loading: false, alert: false, alertMsg: "" })
        }, 3000);
      })
      .catch(err => {
        setStatus({ loading: false, alert: false, alertMsg: "" })
        return setError("Invalid Credential");
      });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <div className='signupImgContainer'>
          <img width="200px" height="200px" src={Logo} alt='OLX Logo' />
        </div>
        {loading && <Loading />}
        {alert && <Alert alert={alertMsg} />}
        <form onSubmit={formHandler}>
          {
            error && <p style={{
              width: "100%", color: "red",
              fontWeight: "600", border: "1px solid red",
              padding: "0.2rem", ontStyle: "italic"
            }}>{error}</p>
          }

          <label htmlFor="nameInput">Username</label>
          <br />
          <input className="input" id="nameInput"
            onChange={inputHandler}
            type="text" name="name" value={name.value} />
          {name.errorStatus && <p className="errorSignup">{name.error}</p>}
          <br />


          <label htmlFor="emailInput">Email</label><br />
          <input className="input" id="emailInput"
            onChange={inputHandler}
            type="text" name="email" value={email.value} />
          {email.errorStatus && <p className="errorSignup">{email.error}</p>}
          <br />

          <label htmlFor="phoneInput">Phone</label><br />
          <input className="input" id="phoneInput"
            onChange={inputHandler}
            type="tel" name="phone" value={formData.phone.value} />
          {phone.errorStatus && <p className="errorSignup">{phone.error}</p>}
          <br />

          <label htmlFor="passwordInput">Password</label><br />
          <input className="input" id="passwordInput"
            onChange={inputHandler}
            type="password" name="password" value={formData.password.value} />
          {password.errorStatus && <p className="errorSignup">{password.error}</p>}
          <br /><br />

          <button>Signup</button>
        </form>

        <Link className='alreadyAUser' to="/login">Already a user?</Link>
      </div>
    </div>
  );
}


const Alert = ({alert}) => {
  return (
    <div style={{ width: "100%" }} className="alert alert-primary">
      <p style={{margin: "0"}}>{alert}</p>
    </div>
  )
}
