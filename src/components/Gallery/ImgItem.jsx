import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Spinner from './../Spinner/Spinner';

const ImgItem = ({img,handleImage,setpage,setimages}) => {
    const navigate = useNavigate();
    const [loaded, setloaded] = useState(false);
    

    return (
        <div className="img-item"  key={img.id} >

            <img src={img.imgSrc}
            alt="Image"
            onClick={handleImage}
            onLoad={()=>setloaded(true)}
            />
            {!loaded?<Spinner />:<></>}

            <div className="tags-img">
                {img.tags.map(tag=><p key={tag} onClick={()=>{setpage(1);window.scroll(0,0);setimages([]);navigate(`/tag/${tag}`)}}>#{tag} </p>)}
            </div>

        </div>
    );
}

export default ImgItem;