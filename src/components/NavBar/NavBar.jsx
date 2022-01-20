import React, {useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css'

const NavBar = () => {
    const [showMenu, setshowMenu] = useState(false);

    return (
    <>
        <div className="navbar">
            <div className="logo">
                <a href="/"><img src="./src/logo.svg" alt="Logo ImgWide" /></a>
            </div>
            <div className="icon-menu" onClick={()=>setshowMenu(!showMenu)}>
                <img src="./src/menu-icon.svg" alt="Menu ImgWide" />
            </div>
        </div>
        <Menu 
        showMenu={showMenu}
        />
    </>

    );
}

export default NavBar;