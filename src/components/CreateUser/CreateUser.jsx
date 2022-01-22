import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './CreateUser.css'

const CreatUser = ()=>{
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 
    const [username, setUsername] = useState('')

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState([])
    const [showError, setshowError] = useState(false)
    const [createUser, setcreateUser] = useState(false);
    const navigate = useNavigate()

    const handleUsername = e =>{
        setUsername(e.target.value)
    }

    const handleName = e =>{
        setName(e.target.value)
    }

    const handlePassword = e=>{
        setPassword(e.target.value)
    }

    const handleLogin = ()=>{
        navigate('/login')
    }

    const handleSubmit = e=>{
        e.preventDefault()
        seterror([])
        let errors = []

        if(username.length<6) seterror(errors.push('The username must contain 6 or more letters'))
        if(name.length<4) seterror(errors.push('The name must contain 4 or more letters'))
        if(password.length<8) seterror(errors.push('The password must contain 8 or more letters'))

        seterror(errors)

        if(errors.length > 0){
        setshowError(true)
        setTimeout(() => {
            setshowError(false)
        }, 3000);}

        if(errors.length===0){
            axios.post(PATH+'/users/createuser',{
                username,
                name,
                password
            }).then(res => setcreateUser(true)).catch(err=> {
                seterror(['Already existing username, please choose another.'])
                setshowError(true)
                setTimeout(() => {
                    setshowError(false)
                }, 3000);
            }   
                )
        }
    }
    if(createUser === false){
    return(
        <form onSubmit={handleSubmit} className="login-form" >
            <h3>Sign Up</h3>
            <div className="signup-form">
                <div className="input-form">
                    <label>Username - Minimum 6 characters</label>
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" onChange={handleUsername} value={username}></input>
                </div>
            {username.length < 6
                ? <div className="wrong"><i class="fas fa-times-circle"></i></div>
                : <div className="check"><i class="fas fa-check-circle"></i></div>}
            </div>
            <div className="signup-form">
                <div className="input-form">
                    <label>Name - Minimum 4 characters</label>
                    <i class="fas fa-user-tag"></i>
                    <input type="text" placeholder="Name" onChange={handleName} value={name}></input>
                </div>
            {name.length < 4
                ? <div className="wrong"><i class="fas fa-times-circle"></i></div>
                : <div className="check"><i class="fas fa-check-circle"></i></div>}
            </div>
            <div className="signup-form">
                <div className="input-form">
                    <label>Password - Minimum 8 characters</label>
                    <i className="fas fa-key"></i>
                    <input type="password" placeholder="Password" onChange={handlePassword} value=      {password}></input>
                </div>
            {password.length < 8
                ? <div className="wrong"><i class="fas fa-times-circle"></i></div>
                : <div className="check"><i class="fas fa-check-circle"></i></div>}    
            </div>
            <button className="btn-grad btn-signup">Sign Up</button>
            <p className="or" onClick={()=>navigate('/login')} style={{cursor:'pointer',marginBottom:'10px'}}>Back to Login Form</p>
            <div className="modal-error" style={
                showError === false
                ? {visibility:'hidden',opacity:0}
                : {opacity:1}
            }>
                {error.map(err => {
                    return(<p>- {err}</p>)
                })}
            </div>
        </form>
    )}else{
        return(
            <div className="login-form create-user">
                <p>User created successfully</p>
                <p>Welcome to ImgWide</p>
                <button className="btn-grad btn-signup" onClick={handleLogin}>Go to Login</button>
            </div>
        )
    }
}

export default CreatUser