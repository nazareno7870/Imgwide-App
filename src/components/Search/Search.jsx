import { useState,useEffect, useCallback, useRef } from 'react';
import ModalImage from '../ModalImage/ModalImage';
import debounce from 'lodash.debounce';
import isNearScreen from '../isNearScreen/isNearScreen';
import Masonry from 'react-masonry-css'
import ImgItem from '../Gallery/ImgItem';
import useGetAllPostbySearch from './../../services/useGetAllPostbySearch';


const Search = () => {

    const search = window.location.pathname.slice(8)
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
    const {images,setimages} = useGetAllPostbySearch({page,search})
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

export default Search;