import {useState,useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './Login.css'
import userContext from '../../context/userContext'


const LoginForm = ()=>{
const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

const [username, setusername] = useState('')
const [password, setpassword] = useState('')
const [showError, setshowError] = useState(false)
const {user, setuser} = useContext(userContext);
const navigate = useNavigate()

useEffect(() => {
    if(user.token){
        navigate('/')
    }
}, [user]);



 

const handleChangeUser = e =>{
  setusername(e.target.value)
}

const handleChangePassword = e=> {
  setpassword(e.target.value)
}

const handleError = ()=>{
    setshowError(true)
    setTimeout(() => {
        setshowError(false) 
    }, 4000);
}

const loginOk = user =>{
    setuser(user)
    setusername('')
    setpassword('')
    window.localStorage.setItem('token',user.token)
    window.localStorage.setItem('username',user.username)
    navigate('/')
}

const submitLogin = async e=>{
    e.preventDefault()
    try {
        const req = await axios.post(PATH+'/login',{
            username,
            password
        })
        if(req.data.username){
            loginOk(req.data)
        }
    } catch (error) {
        handleError()
    }}


    return (
    <>    
        <form className="login-form" onSubmit={submitLogin}>
            <h3>Login Form</h3>
            <div className="user-form">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" onChange={handleChangeUser} value={username}></input>
            </div>
            <div className="user-form">
            <i className="fas fa-key"></i>
            <input type="password" placeholder="Password" onChange={handleChangePassword} value={password}></input>
            </div>
            <button className="btn-grad">Login</button>
            <p style={{cursor:'pointer'}} onClick={()=>navigate('/resetform')} className="or">Reset Password click here!</p>
            <button className="btn-create-user" onClick={()=>navigate('/signup')}>Create User</button>
            <div style={{opacity: showError ? '1':'0'}} className="error-login">
            <p>User or Password wrongs</p>
            </div>
        </form>

    </>
)}
export default LoginForm