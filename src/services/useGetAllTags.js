import { useEffect,useState } from "react";

  const useGetAllTags = ({settagsBtn}) => {
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

    const [tags, settags] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(PATH+`/tags/all`,{
            signal: signal
        })
        .then(res => res.json())
        .then(data => {
          const array = data.map(t=>t.tag)
          settagsBtn(array)
        })
        .catch((err) => {
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            } else {
              setError(err);
            }
          });
        return () => controller.abort();
        
    }, []);

    return (tags);
}

export default useGetAllTags;