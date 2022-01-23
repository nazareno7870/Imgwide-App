import { useEffect,useState } from "react";

  const useGetProfile = ({username}) => {
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

    const [profile, setprofile] = useState({});
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(PATH+`/profile/username=${username}`,{
            signal: signal
        })
        .then(res => res.json())
        .then(data => {setprofile(data)})
        .catch((err) => {
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            } else {
              setError(err);
            }
          });

        return () => controller.abort();
        
    }, []);

    return ({profile});
}

export default useGetProfile;