import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
const Register = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/login');
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
                            <input type="text" className="loginInput" placeholder='Username' />

                            <input type="text" className="loginInput" placeholder='Email' />

                            <input type="text" className="loginInput" placeholder='Password' />
                            <input type="text" className="loginInput" placeholder='Password Again' />
                            <button className="loginButton" onClick={handleSignUp}>Sign Up</button>
                            <span className="loginForgot">Forgot Password ?</span>
                            <button className="loginRegisterButton" onClick={handleLoginRedirect}>Login into Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register