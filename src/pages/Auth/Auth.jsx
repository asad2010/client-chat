import React, { useState } from 'react'
import Logo from "../../img/logo.png"

import "./Auth.css"
import { useInfoContext } from '../../context/Context'
import { login, register } from '../../api/authRequests'

export const Auth = () => {
  const {setCurrentUser} = useInfoContext();

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const signUp = async() => {
    try {
      setLoading(true)
      const res = await register(data);
      setCurrentUser(res.data.user)
      localStorage.setItem("profile", JSON.stringify(res.data.user))
      localStorage.setItem("token", res.data.token)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error.response.data.message);
    }
  }

  const logIn = async() => {
    try {
      setLoading(true)
      const res = await login(data);
      setCurrentUser(res.data.user)
      localStorage.setItem("profile", JSON.stringify(res.data.user))
      localStorage.setItem("token", res.data.token)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error.response.data.message);
    }
  }

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleForm = (e) => {
    setConfirmPassword(true)
    e.preventDefault()
    
    if(isSignup) {
      logIn()
    } else {
      data.password === data.confirmPassword ? signUp() : setConfirmPassword(false)
    }
  }

  const resetForm = () => {
    setData(initialState)
    setConfirmPassword(confirmPassword)
  }

  return (
    <div className='auth'>

      <div className="auth-left">
        <img className='logo-img' src={Logo} alt="logo_img" />
        <div className="app-name">
          <h1>JS Media</h1>
          <h6>Explore with WEBSTAR IT ACADEMY</h6>
        </div>
      </div>

      <div className="auth-right">
        <form onSubmit={handleForm} action="#" className="auth-form">
          <h3>{isSignup ? "Login" : "Register"}</h3>
          {
            !isSignup && (
              <>
                <div>
                  <input onChange={handleInput} type="text" name='firstname' className="info-input" placeholder='First Name' value={data.firstname} required/>
                </div>
                <div>
                  <input onChange={handleInput} type="text" name='lastname' className="info-input" placeholder='Last Name' value={data.lastname} required/>
                </div>
              </>
            )
          }
          <div>
            <input onChange={handleInput} type="email" name='email' className="info-input" placeholder='Email' value={data.email} required/>
          </div>
          <div>
            <input onChange={handleInput} type="password" name='password' className="info-input" minLength={3} placeholder='Password' value={data.password} required/>
          </div>
          {
            !isSignup && 
            <div>
              <input onChange={handleInput} type="password" name='confirmPassword' className="info-input" placeholder='Confirm Password' value={data.confirmPassword} required/>
            </div>
          }

          {
            !confirmPassword && <span className="confirm-span">*Confirm password is not same</span>
          }
          <div>
            <span className="info-span" onClick={()=> {
              setIsSignup(!isSignup)
              resetForm()
            }}>
              {!isSignup ? "Already have a account Login" : "Don't have an account SignUp"}
            </span>
            <button disabled={loading} className="info-btn button">
              {loading ? "Loading..." : isSignup ? "Login" : "SignUp"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}
