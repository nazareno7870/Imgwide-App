import { useEffect,useState } from "react";

const useGetPost = ({postId}) => {
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

    const [img, setimages] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(PATH+`/posts/post=${postId}`,{
            signal: signal
        })
        .then(res => res.json())
        .then(data => setimages(data))
        .catch((err) => {
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            } else {
              setError(err);
            }
          });
        return () => controller.abort();
        
    }, [postId]);

    return ({img,setimages});
}

export default useGetPost;