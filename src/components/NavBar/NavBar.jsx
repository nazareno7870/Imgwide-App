import React, {useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css';
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const [showMenu, setshowMenu] = useState(false);
    const navigate = useNavigate();

    return (
    <>
        <div className="navbar">
            <div className="logo">
                <a href="#" onClick={()=>navigate('/')}><img src="./src/logo.svg" alt="Logo ImgWide" /></a>
            </div>
            <div className="icon-menu" onClick={()=>setshowMenu(!showMenu)}>
                <img src="./src/menu-icon.svg" alt="Menu ImgWide" />
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