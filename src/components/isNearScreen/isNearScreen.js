import { useState,useEffect } from 'react';
const isNearScreen = ({ref,distance = '200px'}) => {

    const [nextShow, setnextShow] = useState(false);

    useEffect(() => {
        const handleShowNext =(e)=>{
            e[0].isIntersecting 
            ? setnextShow(true)
            : setnextShow(false)
        }

        const observer = new IntersectionObserver(handleShowNext,{
            rootMargin: distance,

        })

        observer.observe(ref.current)
    }, []);

    return ({nextShow,setnextShow});
}

export default isNearScreen;