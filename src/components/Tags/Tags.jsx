import { useState } from 'react';
import useGetAllTags from './../../services/useGetAllTags';
import { useNavigate } from "react-router-dom"
import './Tags.css'
const Tags = () => {
    const [tagsBtn, settagsBtn] = useState([]);
    useGetAllTags({settagsBtn})
    const navigate = useNavigate();

    return (

        <div className="tags-gallery">
        {tagsBtn.map(tag=>{
            return(<button key={tag} onClick={()=>navigate(tag)}>{tag}</button>)
        })}

        </div>  
    );
}

export default Tags;