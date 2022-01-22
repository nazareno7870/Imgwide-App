import {useState} from 'react'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const CreatUser = ()=>{
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
        navigate('/')
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
            axios.post('http://localhost:3001/users',{
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
                    <input type="text" placeholder="Username" onChange={handleUsername} value={username}></input>
                </div>
            {username.length < 6
                ? <FontAwesomeIcon className="wrong" icon={faTimesCircle} />
                : <FontAwesomeIcon className="check" icon={faCheckCircle} />}
            </div>
            <div className="signup-form">
                <div className="input-form">
                    <label>Name - Minimum 4 characters</label>
                    <input type="text" placeholder="Name" onChange={handleName} value={name}></input>
                </div>
            {name.length < 4
                ? <FontAwesomeIcon className="wrong" icon={faTimesCircle} />
                : <FontAwesomeIcon className="check" icon={faCheckCircle} />}
            </div>
            <div className="signup-form">
                <div className="input-form">
                    <label>Password - Minimum 8 characters</label>
                    <input type="password" placeholder="Password" onChange={handlePassword} value=      {password}></input>
                </div>
            {password.length < 8
                ? <FontAwesomeIcon className="wrong" icon={faTimesCircle} />
                : <FontAwesomeIcon className="check" icon={faCheckCircle} />}    
            </div>
            <button className="btn-grad btn-signup">Sign Up</button>
            <p className="or" onClick={()=>navigate('/')} style={{cursor:'pointer',marginBottom:'10px'}}>Back to Login Form</p>
            <img src='./imgs/logo.png' alt="Logo Social-app"></img>
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
                <p>Welcome to Social-App</p>
                <button className="btn-grad btn-signup" onClick={handleLogin}>Go to Login</button>
                <img id="img-succesuser" src='./imgs/logo.png' alt="Logo Social-app"></img>
            </div>
        )
    }
}

export default CreatUser