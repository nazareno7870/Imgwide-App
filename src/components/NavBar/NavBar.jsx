import React, {useContext, useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css';
import { useNavigate } from "react-router-dom"
import useLogin from './../../services/useLogin';
import userContext from '../../context/userContext';

const NavBar = () => {
    const [showMenu, setshowMenu] = useState(false);
    const navigate = useNavigate();
    const {user,setuser} = useContext(userContext)
    useLogin()
    const handleLogout =()=>{
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('token')
        setuser({})
        navigate('/')
    }


    return (
    <>
        <div className="navbar">
            <div className="logo">
                <a onClick={()=>navigate('/')}><img src="../imgs/assets/logo.svg" alt="Logo ImgWide" /></a>
            </div>

            <div className="menu-desk">
                <ul>
                    <li onClick={()=>{navigate('/gallery')} }><i className="fas fa-home"></i></li>
                    <li onClick={()=>{navigate('/tag')}}><i className="fas fa-hashtag"></i></li>
                    {user.id && <li onClick={()=>{navigate('/createpost')}}><i className="fas fa-plus-circle"></i></li>}
                </ul>
             </div>

             <div className="menu-desk login">
                <ul>
                    {user.username
                    ?<><div className="username-top"><p>{user.username}</p><i onClick={handleLogout} className="fas fa-door-open"></i></div></>
                    :<li onClick={()=>{navigate('/login')} }><i className="fas fa-user"></i>Login</li>}
                </ul>
             </div>

            <div className="icon-menu" onClick={()=>setshowMenu(!showMenu)}>
                <img src="../imgs/assets/menu-icon.svg" alt="Menu ImgWide" />
            </div>
        </div>

        <Menu 
        showMenu={showMenu}
        setshowMenu={setshowMenu}
        handleLogout={handleLogout}
        />



    </>

    );
}

export default NavBar;