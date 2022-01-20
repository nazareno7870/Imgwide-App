import { useRef , useEffect} from 'react';
import './Menu.css'
const Menu = ({showMenu}) => {
    const menu = useRef()
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
                <li>Login</li>
                <li>Imagenes</li>
                <li>Categorias</li>
                <li>Tags</li>
            </ul>
        </div>
    );
}

export default Menu;