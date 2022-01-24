import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const ResetPassWord = () => {
  const navigate = useNavigate()
  const id =  window.location.pathname.slice(7)
  const [pass, setpass] = useState('');
  const [repitpass, setrepitpass] = useState('');
  const [showError, setshowError] = useState(false);
  const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

  const submitChangePass = async e=>{
    e.preventDefault()

    if(pass !== repitpass){
      setshowError(true)
      setTimeout(() => {
        setshowError(false)
      }, 3000);
    }else{

      try {
        const req = await axios.post(PATH+'/users/changepass',{
            idUnico:id,
            password:pass
        })
        if(req.data.username){
          navigate('/login')
        }
    } catch (error) {
      navigate('/')
    }
    }

}

  return (
    <form className="login-form" onSubmit={submitChangePass}>
      <h3>Change Password</h3>
      <div className="user-form">
      <i className="fas fa-key"></i>
      <input type="password" placeholder="New Password" onChange={e=>setpass(e.target.value)} value={pass}></input>
      </div>
      <div className="user-form">
      <i className="fas fa-key"></i>
      <input type="password" placeholder="Repit Password" onChange={e=>setrepitpass(e.target.value)} value={repitpass}></input>
      </div>
      <button className="btn-grad">Change</button>
      <div style={{opacity: showError ? '1':'0'}} className="error-login">
      <p>Passwords do not match</p>
    </div>
</form>

  );
}

export default ResetPassWord;
