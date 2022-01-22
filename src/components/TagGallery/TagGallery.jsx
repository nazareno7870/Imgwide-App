import './TagGallery.css'
import { useState,useEffect, useCallback, useRef } from 'react';
import ModalImage from '../ModalImage/ModalImage';
import debounce from 'lodash.debounce';
import isNearScreen from '../isNearScreen/isNearScreen';
import Masonry from 'react-masonry-css'
import useGetAllPostbyTag from './../../services/useGetAllPostbyTag';
import { useNavigate } from "react-router-dom"


const TagGallery = () => {
    const navigate = useNavigate();

    const TagRef = window.location.pathname.slice(5)
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
    const {images,setimages} = useGetAllPostbyTag({page,TagRef})
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
        return (<div className="img-item"  key={img.id}>
                            <img src={img.imgSrc} alt="Image" onClick={handleImage}/>
                            <div className="tags-img">
                            {img.tags.map(tag=><p key={tag} onClick={()=>{setpage(1);window.scroll(0,0);setimages([]);navigate(`/tag/${tag}`)}}>#{tag} </p>)}

                            </div>
                        </div>)
      });

    return (
        <>
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

export default TagGallery;