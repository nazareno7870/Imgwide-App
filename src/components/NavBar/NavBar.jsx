import React, {useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css';
import { useNavigate } from "react-router-dom"
import useLogin from './../../services/useLogin';

const NavBar = () => {
    const [showMenu, setshowMenu] = useState(false);
    const navigate = useNavigate();
    useLogin()

    return (
    <>
        <div className="navbar">
            <div className="logo">
                <a onClick={()=>navigate('/')}><img src="../imgs/assets/logo.svg" alt="Logo ImgWide" /></a>
            </div>
            <div className="menu-desk">
            <ul>
                <li onClick={()=>{navigate('/gallery')} }>Latest</li>
                <li onClick={()=>{navigate('/createpost')}}>Create Post</li>
                <li onClick={()=>{navigate('/tag')}}>Tags</li>
            </ul>
             </div>
            <div className="icon-menu" onClick={()=>setshowMenu(!showMenu)}>
                <img src="../imgs/assets/menu-icon.svg" alt="Menu ImgWide" />
            </div>
        </div>

        <Menu 
        showMenu={showMenu}
        setshowMenu={setshowMenu}
        />



    </>

    );
}

export default NavBar;