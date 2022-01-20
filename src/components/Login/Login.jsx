import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"

const LoginForm = ()=>{
const user = window.localStorage.getItem('username')
const token = window.localStorage.getItem('token') 
const dispatch = useDispatch()
const [username, setusername] = useState('')
const [password, setpassword] = useState('')
const [error, seterror] = useState('')
const navigate = useNavigate()

if(user && token){
    axios.post('http://localhost:3001/login/exist',{
        username:user,
        token
    }).then(res=>{
        loginOk(res.data)
    })
  }

const handleChangeUser = e =>{
  setusername(e.target.value)
}

const handleChangePassword = e=> {
  setpassword(e.target.value)
}

const showError = ()=>{
    seterror('User or Password wrongs')
    setTimeout(() => {
        seterror('') 
    }, 4000);
}

const loginOk = user =>{
    const inicializar = {
        type:'INIT',
        payload:user
    }
    setusername('')
    setpassword('')
    window.localStorage.setItem('token',user.token)
    window.localStorage.setItem('username',user.username)
    dispatch(inicializar)
    navigate('/feed')

}

const submitLogin = async e=>{
    e.preventDefault()
    const req = await axios.post('http://localhost:3001/login',{
        username,
        password
    })
    if(req.data.username){
        loginOk(req.data)
    }else{
        showError()
    }}

    return (
    <>    
        <form className="login-form" onSubmit={submitLogin}>
            <h3>Login Form</h3>
            <div className="user-form">
            <input type="text" placeholder="Username" onChange={handleChangeUser} value={username}></input>
            </div>
            <div className="user-form">
            <input type="password" placeholder="Password" onChange={handleChangePassword} value={password}></input>
            </div>
            <button className="btn-grad">Login</button>
            <p className="or">or</p>
            <button className="btn-create-user" onClick={()=>navigate('/signup')}>Create User</button>
            <img src='./imgs/logo.png' alt="Logo Social-app"></img>
            <div className="error-login">
            <p>{error}</p>
            </div>
        </form>

    </>
)}
export default LoginForm