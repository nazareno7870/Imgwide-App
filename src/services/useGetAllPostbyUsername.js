import { useEffect,useState } from "react";

const useGetAllPostbyUsername = ({page,username}) => {
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

    const [images, setimages] = useState([]);
    const limit = 6;
    const [error, setError] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(PATH+`/profile/profile=${username}&limit=${limit}&skip=${limit*(page-1)}`,{
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
        
    }, [page,username]);

    return ({images,setimages});
}

export default useGetAllPostbyUsername;