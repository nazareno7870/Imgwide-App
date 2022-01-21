import { useEffect,useState } from "react";

const useGetAllImages = ({page}) => {
    const [images, setimages] = useState([]);
    const limit = 3;
    const [error, setError] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(import.meta.env.VITE_PATH+`/posts/limit=${limit}&skip=${limit*(page-1)}`,{
            signal: signal
        })
        .then(res => res.json())
        .then(data => setimages([...images,...data]))
        .catch((err) => {
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            } else {
              setError(err);
            }
          });
        return () => controller.abort();
        
    }, [page]);

    return ({images});
}

export default useGetAllImages;