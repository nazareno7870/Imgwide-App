import axios from 'axios';
import { useState } from 'react';
import './CreatePost.css';
import Spinner from './../Spinner/Spinner';
import Resizer from "react-image-file-resizer";

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgurl, setimgurl] = useState(null)
    const [tags, setcontent] = useState("")
    const [loading, setloading] = useState(false);

    const handleReset =()=>{
        setcontent('')
        setimgurl(null)
        setSelectedFile(null)
        setloading(false)
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

    return(
        <>
            <form className="form-new-post" onSubmit={handleSubmit}>
                <textarea placeholder="Type tags here" value={tags} onChange={(e) => setcontent(e.target.value)}></textarea>
                {imgurl !== null ? <img className="new-image" src={imgurl} alt="imagen a enviar"></img> : <></>}
                <label htmlFor="files" className="btn">Select Image</label>
                <input
                id="files"
                type="file"
                accept="image/jpg, image/jpeg"
                onChange={handleChange}
                />
                <button className="btn-creatpost">Submit</button>
            </form>

            <div className="modal-image" style={{display:loading ? 'block':'none'}}>
        
            <Spinner />

             </div>
        </>


    )
}
export default CreatPost