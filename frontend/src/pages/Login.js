import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("admin") !== null) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [])
  

  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default Login
