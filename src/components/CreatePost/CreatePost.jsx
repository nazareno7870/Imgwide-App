import axios from 'axios';
import { useState,useContext,useRef} from 'react';
import './CreatePost.css';
import Spinner from './../Spinner/Spinner';
import useGetAllTags from '../../services/useGetAllTags';
import userContext from '../../context/userContext';
import { useNavigate } from "react-router-dom"


const CreatPost = ()=>{

    const [invalidImage, setinvalidImage] = useState(null);

    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [tagsBtn, settagsBtn] = useState([]);
    useGetAllTags({settagsBtn})
    const [tags, setTags] = useState([]);
    const [loading, setloading] = useState(false);
    const [newtag, setnewTag] = useState('');
    const [imgurl, setimgurl] = useState('')
    const [linkImage, setlinkImage] = useState('');
    const {user} = useContext(userContext)
    const img = useRef()
    const [showError, setshowError] = useState(false);

    const handleReset =()=>{
        setTags([])
        setimgurl('')
        setloading(false)
        setSelectedFile(null)
        setlinkImage('')
    }
    
    const handleTag=(e)=>{
        const tag = e.target.innerHTML
        if(tags.includes(tag)){
            const newArray = tags.filter(t=>t !==tag)
            setTags(newArray)
        }else{
            setTags(prevTags=>[...prevTags,tag])
        }
    }
    
    const handleChange = e=>{

        setSelectedFile(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = e=>{
            setimgurl(reader.result)
        }
 
    }

    const handleMiddleware =(e)=>{
        let token = `Bearer ${user.token}`
        const config = {
            headers: {
              Authorization: token
            }}
        

        e.preventDefault()
        if(linkImage !== '' && img.current.height>45){
            const obj = {

                imgurl:linkImage,
                tags,
                userId:user.id,
                username:user.username
            }
    
            axios.post(PATH+'/posts/createpost',obj,config).then(resp=>{
                handleReset()
            })

        }else if(img.current.height>45){
            handleSubmit(e)
        }else{
            setimgurl('')
            setshowError(true)
            setTimeout(() => {
                setshowError(false)
            }, 5000);
        }
    }



    const handleSubmit = async e=>{
        
        setloading(true)
        e.preventDefault()

        let userInfo= {
            file:[],
            filepreview:null,
        }

        const imageFile = selectedFile;
        const imageFilname = imageFile.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {

//------------- Resize img code ----------------------------------
             var canvas = document.createElement('canvas');
             var ctx = canvas.getContext("2d");
             ctx.drawImage(img, 0, 0);

             var MAX_WIDTH = 900;
             var MAX_HEIGHT = 900;
             var width = img.width;
             var height = img.height;

             if (width > height) {
               if (width > MAX_WIDTH) {
                 height *= MAX_WIDTH / width;
                 width = MAX_WIDTH;
               }
             } else {
               if (height > MAX_HEIGHT) {
                 width *= MAX_HEIGHT / height;
                 height = MAX_HEIGHT;
               }
             }
             canvas.width = width;
             canvas.height = height;
             var ctx = canvas.getContext("2d");
             ctx.drawImage(img, 0, 0, width, height);
             ctx.canvas.toBlob((blob) => {
               const file = new File([blob], imageFilname, {
                   type: 'image/jpeg',
                   lastModified: Date.now()
               });
               userInfo = {
                  ...userInfo,
                  file:file,
                  filepreview:URL.createObjectURL(imageFile),
             }

             let myHeaders = new Headers();
             myHeaders.append("Authorization", import.meta.env.VITE_BEARER_IMGUR);
             
     
             let formdata = new FormData();
             formdata.append("image", userInfo.file);
     
             let requestOptions = {
             mode:'cors',
             method: 'POST',
             headers: myHeaders,
             body: formdata
             };
     
             fetch("https://api.imgur.com/3/image", requestOptions)
             .then(response => response.json())
             .then(result => {
     
                 const link = result.data.link
                 const path = link.slice(0,-4)
     
                 let extension = link.slice(-4)
                 let imgurl= ''
     
                 if(link.slice(-4)==='webp'|| link.slice(-4)==='WEBP'|| link.slice(-4)==='jpeg'||link.slice(-4)==='JPEG'){
                 extension = link.slice(-5)
                 }else if(link.slice(-4)==='gif'||link.slice(-4)==='GIF'){
                     imgurl = path+extension
                 }else{
                     imgurl = path+extension
                 }
                 
                 let token = `Bearer ${user.token}`
                 const config = {
                     headers: {
                       Authorization: token
                     }}

                 const obj = {
                     imgurl,
                     tags,
                     userId:user.id,
                     username:user.username
                 }
         
                 axios.post(PATH+'/posts/createpost',obj,config).then(resp=>{
                     handleReset()
                 })
         
             })
             .catch(error => console.log('error', error));
     


             }, 'image/jpeg', 1);
           setinvalidImage(null)
           };
            img.onerror = () => {
                  setinvalidImage('Invalid image content.');
              return false;
            };
            //debugger
            img.src = e.target.result;
          };
          reader.readAsDataURL(imageFile);


        

        }


    const handleEnter=e=>{
        if(e.key==='Enter'){
            const lower = newtag.toLowerCase()
            const arr = lower.split(" ");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            
            }
            const tagCap = arr.join(" ");
            settagsBtn(prev=>[...prev,tagCap])
            if(tags.includes(tagCap)){
                const newArray = tags.filter(t=>t !==tagCap)
                setTags(newArray)
            }else{
                setTags(prevTags=>[...prevTags,tagCap])
            }
            setnewTag('')
        }
    }

    return(
        <>
            <div className="tags">
                    {tagsBtn.map(tag=>{
                        return(<button key={tag} onClick={handleTag} className={tags.includes(tag)?'active':''}>{tag}</button>)
                    })}
            </div>  
            <input type="text" id="newTag" placeholder='New Tag' value={newtag} onKeyPress={handleEnter} onChange={e=>setnewTag(e.target.value)}/>

            <form className="form-new-post" onSubmit={handleMiddleware}>

                {imgurl !== '' ? <img ref={img} className="new-image" src={imgurl} alt="imagen a enviar"></img> : <></>}
                {showError ? <p>Enter a valid url, please.</p> : <></>}
            { user.grade === 'admin' && <><label htmlFor="files" className="btn">Select Image</label>
                <input
                id="files"
            type="file"
            accept="image/jpg, image/jpeg, image/gif"
            onChange={handleChange}
            /></>}
            <input placeholder='Write url' type="text" name="urlImage" id="urlImage" value={linkImage} onChange={e=>{setlinkImage(e.target.value);setimgurl(e.target.value)}}/>
                <button className="btn-creatpost">Submit</button>
            </form>

            <div className="modal-image" style={{display:loading ? 'block':'none'}}>
        
            <Spinner />

             </div>
        </>


    )
}
export default CreatPost