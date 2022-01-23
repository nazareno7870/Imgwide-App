import { useRef , useEffect,useContext} from 'react';
import './Menu.css'
import { useNavigate } from "react-router-dom"
import userContext from '../../context/userContext';

const Menu = ({showMenu,setshowMenu,handleLogout,searchInput,setSearchInput}) => {
    const menu = useRef()
    const navigate = useNavigate();
    const {user} = useContext(userContext)

    useEffect(() => {
        if(showMenu){
            menu.current.style.top = '47px'
        }else{
            menu.current.style.top = '-230px'
        }
    }, [showMenu]);

    const handleEnter = e=>{
        if(e.key === 'Enter'){
            handleSearch()
            setshowMenu(!menu)
        }
    }

    const handleSearch = (e)=>{
        navigate(`/middle/${searchInput}`)
        setSearchInput('')
        setshowMenu(!menu)
    }

    return (
        <div ref={menu} className="menu">
            {user.username && <p>Hi, {user.username}</p>}
            <ul>
                <li><div className="search">
                <input onKeyPress={handleEnter} autoComplete="off" type="text" name="search" id="search" value={searchInput} onChange={e=>setSearchInput(e.target.value)} />
                <i onClick={handleSearch} className="fas fa-search"></i>
                </div></li>
                <li onClick={()=>{navigate('/gallery');setshowMenu(!menu)} }><i className="fas fa-home"></i> Latest</li>
                <li onClick={()=>{navigate('/tag');setshowMenu(!menu)}}><i className="fas fa-hashtag"></i> Tags</li>
                {user.username && <li onClick={()=>{navigate('/createpost');setshowMenu(!menu)}}><i className="fas fa-plus-circle"></i> Create Post</li>}
                {user.username? <li onClick={()=>{handleLogout();setshowMenu(!menu)}}><i className="fas fa-door-open"></i> Logout</li> : <li onClick={()=>{navigate('/login');setshowMenu(!menu)}}><i className="fas fa-sign-in-alt"></i> Login</li>}
            </ul>
        </div>
    );
}

export default Menu;