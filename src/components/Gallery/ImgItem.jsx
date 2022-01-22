import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom"
import Spinner from './../Spinner/Spinner';
import userContext from '../../context/userContext';
import axios from 'axios';

const ImgItem = ({img,handleImage,setpage,setimages,id,likesId,username}) => {
    const navigate = useNavigate();
    const [loaded, setloaded] = useState(false);
    const [like, setlike] = useState(false)
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 
    const {user,setuser} = useContext(userContext)
    const [likes, setlikes] = useState(likesId.length);


    useEffect(() => {
        if(user.username){
            if(user.likes.includes(id) && like === false){
                setlike(true)
            }
        }


    }, [])

    const toggleLike = ()=>{
        if(user.username){
            if(like){
                setlikes(prev=>prev-1)
            }else{
                setlikes(prev=>prev+1)
            }
            setlike(!like)

            let arrLikes = user.likes

            const index = arrLikes.indexOf(id)

            if(index>=0){
                let arr1 = arrLikes.slice(0,index)
                let arr2 = arrLikes.slice(index+1,)
    
                arrLikes = arr1.concat(arr2)
            }else{
                arrLikes.push(id)
            }

            setuser(prevUser=>({...prevUser,likes:arrLikes}))

            axios.post(PATH+'/like',{
                userId:user.id,
                postId:id
            })
        }else{
            navigate('/login')
        }

    }

    return (
        <div className="img-item"  key={img.id} id={id}>

            <img src={img.imgSrc}
            alt="Image"
            onClick={handleImage}
            onLoad={()=>setloaded(true)}
            />
            {!loaded?<Spinner />:<></>}
            <div className="bottom-image">
                <div className="stats-post">
                        <p><i className="fas fa-user"></i>{username}</p>
                        <div className="likes"><p>{likes}</p><p><i style={{opacity: like ? 1 : 0}} className="fas fa-heart"></i><i onClick={toggleLike} style={{opacity: !like ? 1 : 0}} className="far fa-heart"></i></p></div>
                    </div>
                <div className="tags-img">
                    {img.tags.map(tag=><p key={tag} onClick={()=>{setpage(1);window.scroll(0,0);setimages([]);navigate(`/tag/${tag}`)}}>#{tag} </p>)}
                </div>

            </div>

        </div>
    );
}

export default ImgItem;