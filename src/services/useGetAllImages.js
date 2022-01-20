import { useEffect,useState } from "react";

const useGetAllImages = ({page}) => {
    const [images, setimages] = useState([]);

    useEffect(() => {
        window.fetch('https://rickandmortyapi.com/api/character/?page='+page)
        .then(res => res.json())
        .then(data => setimages([...images,...data.results]))
    }, [page]);

    return ({images});
}

export default useGetAllImages;