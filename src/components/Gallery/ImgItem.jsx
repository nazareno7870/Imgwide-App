import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom"
import Spinner from './../Spinner/Spinner';
import userContext from '../../context/userContext';
import axios from 'axios';
import './ImgItem.css'
import {TwitterIcon,
    TwitterShareButton,
  } from "react-share";

const ImgItem = ({img,handleImage,setpage,setimages,id,likesId,username}) => {
    const navigate = useNavigate();
    const [loaded, setloaded] = useState(false);
    const [like, setlike] = useState(false)
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 
    const {user,setuser} = useContext(userContext)
    const [likes, setlikes] = useState(likesId.length);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [deletePost, setdeletePost] = useState(false);


    useEffect(() => {
        if(user.username){
            if(user.likes.includes(id) && like === false){
                setlike(true)
            }
        }
    }, [])

    const handleDeletePost = (e)=>{
        let token = `Bearer ${user.token}`
        const config = {
            headers: {
              Authorization: token
            },            
            data:{
                userId:user.id,
                postId:id
            }}

    
        axios.delete(PATH+'/posts/deletepost',config).then(resp=>{
            setdeletePost(true)
            setShowModalDelete(false)
        })

    }

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
        <>
            <div className="img-item"  key={img.id} id={id} style={{display: deletePost && 'none'}}>

                <img src={img.imgSrc}
                alt="Image"
                onClick={handleImage}
                onLoad={()=>setloaded(true)}
                />
                {!loaded?<Spinner />:<></>}
                <div className="bottom-image">
                    {username === user.username && <div className="delete-item" onClick={()=>setShowModalDelete(!showModalDelete)}>
                        <i className="far fa-trash-alt"></i>
                    </div>}
                    <div className="stats-post">
                        <div className="stat-user">
                            <p onClick={()=>{setpage(1);window.scroll(0,0);setimages([]);navigate(`/profile/${username}`)}}><i className="fas fa-user"></i>{username}</p>
                        </div>
                            <div className="likes"><p>{likes}</p><p><i style={{opacity: like ? 1 : 0}} className="fas fa-heart"></i><i onClick={toggleLike} style={{opacity: !like ? 1 : 0}} className="far fa-heart"></i></p></div>
                        </div>
                    <div className="tags-img">
                        {img.tags.map(tag=><p key={tag} onClick={()=>{setpage(1);window.scroll(0,0);setimages([]);navigate(`/tag/${tag}`)}}>#{tag} </p>)}
                    </div>

                </div>

            </div>

            <div className="modal-delete" style={{display: showModalDelete ? 'block' : 'none'}}>
                <div className="modal-delete-container">
                    <p>Are you sure to delete this post?</p>
                    <div className="buttons-modal-delete">
                        <button onClick={()=>setShowModalDelete(!showModalDelete)}>NO</button>
                        <button onClick={handleDeletePost}>YES</button>
                    </div>
                </div>
   
            </div>
        </>
    );
}

export default ImgItem;