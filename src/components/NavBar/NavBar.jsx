import React, {useState} from 'react';
import Menu from '../Menu/Menu';
import './NavBar.css'

const NavBar = () => {
    const [menu, setmenu] = useState(false);

    return (
    <>
        <div className="navbar">
            <div className="logo">
                <img src="./src/logo.svg" alt="Logo ImgWide" />
            </div>
            <div className="icon-menu" onClick={()=>setmenu(!menu)}>
                <img src="./src/menu-icon.svg" alt="Menu ImgWide" />
            </div>
        </div>

        {menu ? <Menu/> : <></>}
    </>

    );
}

export default NavBar;