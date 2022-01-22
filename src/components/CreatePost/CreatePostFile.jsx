import axios from 'axios';
import { useState } from 'react';
import './CreatePost.css';
import Spinner from '../Spinner/Spinner';
import Resizer from "react-image-file-resizer";
import useGetAllTags from '../../services/useGetAllTags';

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      1250,
      "WEBP",
      95,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

const CreatPost = ()=>{
    const [tagsBtn, settagsBtn] = useState([]);
    useGetAllTags({settagsBtn})
    const [tags, setTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgurl, setimgurl] = useState(null)
    const [loading, setloading] = useState(false);
    const [newtag, setnewTag] = useState('');

    const handleReset =()=>{
        setTags([])
        setimgurl(null)
        setSelectedFile(null)
        setloading(false)
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

    const handleSubmit = async e=>{
        
        setloading(true)
        e.preventDefault()
        const file = selectedFile;
        const image = await resizeFile(file);
        const formData = new FormData()
        formData.append("file",image)
        formData.append("tags",tags)
        formData.append("userId",'61e9c0bff06e4fa6550d2760')
        formData.append("username",'Nazareno7870')
        axios.post(import.meta.env.VITE_PATH+'/posts/createpost',formData).then(resp=>{
            handleReset()
        })


        }


    const handleChange = e=>{
        setSelectedFile(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = e=>{
            setimgurl(reader.result)
        }
    }

    const handleEnter=e=>{
        if(e.key==='Enter'){
            const arr = newtag.split(" ");
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

            <form className="form-new-post" onSubmit={handleSubmit}>

                {imgurl !== null ? <img className="new-image" src={imgurl} alt="imagen a enviar"></img> : <></>}
                <input type="text" name="url" id="url" />
                <button className="btn-creatpost">Submit</button>
            </form>

            <div className="modal-image" style={{display:loading ? 'block':'none'}}>
        
            <Spinner />

             </div>
        </>


    )
}
export default CreatPost