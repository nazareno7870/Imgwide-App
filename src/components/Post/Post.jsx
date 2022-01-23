import { useState } from 'react';
import ModalImage from '../ModalImage/ModalImage';
import ImgItem from '../Gallery/ImgItem';
import useGetPost from './../../services/useGetPost';
import './Post.css'
import { useNavigate } from "react-router-dom"

const Post = () => {
    const navigate = useNavigate();

    const postId = window.location.pathname.slice(6)
    const [modal, setmodal] = useState(false);
    const [image, setimage] = useState('');
    const {img,setimages} = useGetPost({postId})
    const [page, setpage] = useState(1);

    console.log(img)

    const handleImage = (e)=>{
        setimage(e.target.currentSrc)
        setmodal(!modal)
    }



    return (
        <>  {img.userId &&                
        
        <>  <div className="unique-post">
                <div className="my-masonry-grid">
                    <div className="my-masonry-grid_column">
                    <ImgItem
                    img={img}
                    handleImage={handleImage}
                    key={img.id}
                    setpage={setpage}
                    setimages={setimages}
                    likesId={img.likesId}
                    username={img.userId.username}
                    id={img.id}
                    />
                    </div>
                </div>
            </div>


            
            <ModalImage
            modal={modal}
            setmodal={setmodal}
            image={image}
            setimage={setimage}
            />
                </>
        }
        {!img.userId &&
              <div className="wrong-user">
                <p>This post does not exist!</p>
                <button onClick={()=>navigate('/')}>Go Home</button>
              </div>
              }
    </>
    );
    
}

export default Post;