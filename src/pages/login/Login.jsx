import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <>
            <div className="login">
                <div className="loginWrapper">

                    <div className="loginLeft">
                        <h3 className="loginLogo">React Facebook</h3>
                        <span className="loginDesc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi accusamus
                        </span>
                    </div>


                    <div className="loginRight">
                        <div className="loginBox">
                            <input type="text" className="loginInput" placeholder='Email' />
                            <input type="text" className="loginInput" placeholder='Password' />
                            <button className="loginButton" onClick={handleLogin}>Log In</button>
                            <span className="loginForgot">Forgot Password ?</span>
                            <button className="loginRegisterButton" onClick={handleRegisterRedirect}>Create a New Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
