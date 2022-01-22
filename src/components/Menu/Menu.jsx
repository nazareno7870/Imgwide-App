import { useRef , useEffect} from 'react';
import './Menu.css'
import { useNavigate } from "react-router-dom"

const Menu = ({showMenu,setshowMenu}) => {
    const menu = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        if(showMenu){
            menu.current.style.top = '47px'
        }else{
            menu.current.style.top = '-156px'
        }
    }, [showMenu]);

    return (
        <div ref={menu} className="menu">
            <ul>
                <li onClick={()=>{navigate('/gallery');setshowMenu(!menu)} }>Latest</li>
                <li onClick={()=>{navigate('/createpost');setshowMenu(!menu)}}>Create Post</li>
                <li onClick={()=>{navigate('/tag');setshowMenu(!menu)}}>Tags</li>
            </ul>
        </div>
    );
}

export default Menu;