import React, {useContext, useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css';
import { useNavigate } from "react-router-dom"
import useLogin from './../../services/useLogin';
import userContext from '../../context/userContext';
import logo from '../../../imgs/assets/logo.svg'
import menu from '../../../imgs/assets/menu-icon.svg'

const NavBar = () => {
    const [showMenu, setshowMenu] = useState(false);
    const navigate = useNavigate();
    const {user,setuser} = useContext(userContext)
    const [searchInput, setSearchInput] = useState('');
    useLogin()
    const handleLogout =()=>{
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('token')
        setuser({})
        navigate('/')
    }

    const handleEnter = e=>{
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    const handleSearch = (e)=>{
        navigate(`/middle/${searchInput}`)
        setSearchInput('')
    }

    return (
    <>
        <div className="navbar">
            <div className="logo">
                <a onClick={()=>{navigate('/')}}><img src={logo} alt="Logo ImgWide" /></a>
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
                    <div className="search">
                        <input onKeyPress={handleEnter} autoComplete="off" type="text" name="search" id="search" value={searchInput} onChange={e=>setSearchInput(e.target.value)} />
                        <i className="fas fa-search" onClick={handleSearch}></i>
                    </div>

                    {user.username
                    ?<><div className="username-top"><p>{user.username}</p><i onClick={handleLogout} className="fas fa-door-open"></i></div></>
                    :<li onClick={()=>{navigate('/login')} }><i className="fas fa-user"></i>Login</li>}
                </ul>
             </div>

            <div className="icon-menu" onClick={()=>setshowMenu(!showMenu)}>
                <img src={menu} alt="Menu ImgWide" />
            </div>
        </div>

        <Menu 
        showMenu={showMenu}
        setshowMenu={setshowMenu}
        handleLogout={handleLogout}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        handleEnter={handleEnter}
        />



    </>

    );
}

export default NavBar;