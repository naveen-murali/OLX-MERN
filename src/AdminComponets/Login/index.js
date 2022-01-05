import React, { useState } from 'react'

import { INPUT_HANDLER } from "../../validation/inputHander";

/* configs */
import axios from '../../Config/axios';
import { useGlobalContext } from "../../Config/globalContext";

/* constants */
import { ADMIN_LOGIN } from "../../Constants/constants";

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
};
const defaultError = { status: false, error: "" };

const Index = () => {
    const [mainError, setMainError] = useState(defaultError);
    const [formData, setFormData] = useState(defaultFormData);
    const { email, password } = formData;

    const { dispatch } = useGlobalContext();

    const inputHandler = (e) => INPUT_HANDLER(e, setFormData);

    const formHandler = (e) => {
        e.preventDefault();
        if (password.errorStatus || email.errorStatus || email.value === "" || password.value === "") {

            setTimeout(() => {
                setMainError({ status: false, error: "" });
            }, 3000);
            return setMainError({ status: true, error: "Please provide entire credentials" });
        }

        const submitData = { email: email.value, password: password.value };
        axios.post("/admin/login", submitData, { validateStatus: (status) => status < 500 })
            .then(response => {
                const { status, data } = response;
                if (data.status === 401) {
                    console.log(data);
                    setTimeout(() => {
                        setMainError({ status: false, error: "" });
                    }, 3000);
                    return setMainError({ status: true, error: data.message });
                }
                if (status === 200) {
                    const { admin, adminAccessToken } = data;
                    dispatch({ type: ADMIN_LOGIN, payload: { admin, adminAccessToken } });
                    window.location.href = "/admin";
                }
            })
            .catch(err => {
                console.log("errr");
                console.log(err);
                setTimeout(() => {
                    setMainError({ status: false, error: "" });
                }, 3000);
                return setMainError({ status: true, error: "Please provide entire credentials" });
            });
    }

    return (
        <div style={{ width: "100vw", minHeight: "100vh", position: 'relative', display: "grid", placeContent: "center" }}>
            <form style={{
                position: "absolute", top: "40%", left: "50%",
                transform: "translate(-40%, -50%)",
                padding: "1rem", width: "20rem"
            }}>
                <h3 style={{ width: "100%", textAlign: "center" }}>Admin Login</h3>

                {mainError.status && <Error error={mainError.error} />}

                <div style={{ display: "flex", flexDirection: "column", padding: "0.2rem 0" }}>
                    <label htmlFor="emailInput">Email</label>
                    <input style={{ padding: "0.5rem", border: "1px solid #aaa", borderRadius: "0.3rem" }}
                        type="email" placeholder='example@gmail.com' id='emailInput'
                        value={email.value} onChange={inputHandler} name='email' />
                    {email.errorStatus && <em className='text-danger' style={{ fontWeight: "600" }}>{email.error}</em>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "0.2rem 0" }}>
                    <label htmlFor="passwordInput">Password</label>
                    <input style={{ padding: "0.5rem", border: "1px solid #aaa", borderRadius: "0.3rem" }}
                        type="password" placeholder='Enter your password' id='passwordInput'
                        value={password.value} onChange={inputHandler} name='password' />
                    {password.errorStatus && <em className='text-danger' style={{ fontWeight: "600" }}>{password.error}</em>}
                </div>

                <div style={{ width: "100%", textAlign: "center" }}>
                    <button className='btn btn-outline-primary my-2' onClick={formHandler}>Login</button>
                </div>
            </form>
        </div>
    )
}

const Error = ({ error }) => {
    return (
        <p className='text-danger'
            style={{
                fontWeight: "600", border: "1px solid red",
                padding: "0.2rem", width: "100%",
                margin: "0.2rem 0", fontStyle: "italic",
                borderRadius: "0.3rem"
            }}>{error}</p>
    )
}

export default Index
