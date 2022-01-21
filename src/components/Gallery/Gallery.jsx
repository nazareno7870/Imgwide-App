import './Gallery.css'
import { useState,useEffect, useCallback, useRef } from 'react';
import ModalImage from '../ModalImage/ModalImage';
import debounce from 'lodash.debounce';
import isNearScreen from '../isNearScreen/isNearScreen';
import useGetAllImages from './../../services/useGetAllImages';

const Gallery = () => {
    const [modal, setmodal] = useState(false);
    const [image, setimage] = useState('');
    const [page, setpage] = useState(1);
    const showMore = useRef()
    const {images} = useGetAllImages({page})
    const {nextShow} = isNearScreen({ref:showMore})
    console.log(images)


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




    return (
        <>
              

                <div id='gallery' className="gallery">

                    {images.length>1 &&
                    images.map(img=>{
                        return(     

                        <div className="img-item" key={img.id}>
                            <img src={'./imgs/posts/'+img.imgSrc} alt="Libertadores de America" onClick={handleImage}/>
                            <div className="tags-img">
                                {img.tags.map(tag=><p key={tag}>#{tag} </p>)}
                            </div>
                        </div>
                        )
                    })}



                </div>

                <div id='observe'>
                            <p ref={showMore} onClick={()=>setpage(page+1)}>Cargar mas</p>
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

export default Gallery;