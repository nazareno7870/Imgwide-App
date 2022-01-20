import axios from 'axios';
import { useState } from 'react';
import './CreatePost.css'
import NavBar from './../NavBar/NavBar';

const CreatPost = ()=>{
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgurl, setimgurl] = useState(null)
    const [tags, setcontent] = useState("")

    const handleSubmit = e=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("file",selectedFile)
        formData.append("tags",tags)
        formData.append("userId",'61e9c0bff06e4fa6550d2760')
        formData.append("username",'Nazareno7870')

        axios.post(import.meta.env.VITE_PATH+'/posts/createpost',formData)
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
                <label for="files" class="btn">Select Image</label>
                <input
                id="files"
                type="file"
                accept="image/jpg, image/jpeg"
                onChange={handleChange}
                />
                <button className="btn-creatpost">Submit</button>
            </form>

        </>


    )
}
export default CreatPost