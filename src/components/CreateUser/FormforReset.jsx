import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const FormforReset = () => {
  const navigate = useNavigate()
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [showError, setshowError] = useState(false);
  const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 
  const [ShoeMessage, setShoeMessage] = useState(false);
  const submitChangePass = async e=>{
    e.preventDefault()

    try {
      const req = await axios.post(PATH+'/users/resetpass',{
          email,
          username
      })
      if(req.data.msg === 'Email Send'){
        setShoeMessage(true)
      }
    } catch (error) {
      setshowError(true)
      setTimeout(() => {
        setshowError(false)
      }, 3000);
    }
    

}

  return (
    <>
    {ShoeMessage
    ? 
    <div className="wrong-user">
    <p>An email has been sent to reset your password</p>
    <button onClick={()=>navigate('/')}>Go Home</button>
    </div>

    : 
    <form className="login-form" onSubmit={submitChangePass}>
    <h3>Change Password</h3>
      <div className="user-form">
      <i className="fas fa-user"></i>
      <input type='text' placeholder="Username" onChange={e=>setusername(e.target.value)} value={username}></input>
      </div>
      <div className="user-form">
      <i className="far fa-envelope"></i>
      <input type='email' placeholder="Email" onChange={e=>setemail(e.target.value)} value={email}></input>
      </div>
      <button className="btn-grad">Change</button>
      <div style={{opacity: showError ? '1':'0'}} className="error-login">
      <p>Invalid Username or Email</p>
      </div>
    </form>
    }
    </>


  );
}

export default FormforReset;
