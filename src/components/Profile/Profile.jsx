import { useState,useEffect, useCallback, useRef } from 'react';
import ModalImage from '../ModalImage/ModalImage';
import debounce from 'lodash.debounce';
import isNearScreen from '../isNearScreen/isNearScreen';
import Masonry from 'react-masonry-css'
import ImgItem from '../Gallery/ImgItem';
import useGetProfile from './../../services/useGetProfile';
import useGetAllPostbyUsername from './../../services/useGetAllPostbyUsername';
import './Profile.css'
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate();

    const username = window.location.pathname.slice(9)
    const {profile}=useGetProfile({username})

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    const [modal, setmodal] = useState(false);
    const [image, setimage] = useState('');
    const [page, setpage] = useState(1);
    const showMore = useRef()
    const {images,setimages} = useGetAllPostbyUsername({page,username})
    const {nextShow} = isNearScreen({ref:showMore})
    const handleNextPage = useCallback(
        debounce(()=>{setpage(prevPag=> prevPag+1)}, 500)
      , []);
    
      useEffect(() => {
        if(nextShow){handleNextPage()}

    }, [nextShow,handleNextPage]);


    const handleImage = (e)=>{
        setimage(e.target.currentSrc)
        setmodal(!modal)
    }


    const items = images.map(function(img) {
        return (<ImgItem
        img={img}
        handleImage={handleImage}
        key={img.id}
        setpage={setpage}
        setimages={setimages}
        likesId={img.likesId}
        username={img.userId.username}
        id={img.id}
        />)
      });

    return (
        <>
            {profile.username &&
            <>
              <div className="container-profile">

              <div className="username">
                <i class="fas fa-id-card"></i>
                <p>{username}</p>
              </div>

              <div className="posts">
                <i class="fas fa-camera-retro"></i>
                <p>{profile.posts.length}</p>
              </div>

              </div>
              </>} 

              {!profile.username &&
              <div className="wrong-user">
                <p>Wrong Username</p>
                <button onClick={()=>navigate('/')}>Go Home</button>
              </div>
              }
              <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
              >
              {items}
              </Masonry>
                <div id='observe'>
                            <p ref={showMore}>Whoops... That's it, dude.</p>
                </div>

                <ModalImage
                modal={modal}
                setmodal={setmodal}
                image={image}
                setimage={setimage}
                />
      

    </>
    );
    
}

export default Profile;