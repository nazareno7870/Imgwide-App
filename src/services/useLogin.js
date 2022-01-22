import { useEffect,useContext} from "react";
import userContext from "../context/userContext";

const useLogin = () => {
    const PATH = import.meta.env.DEV ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD; 

    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token') 
    const {user, setuser} = useContext(userContext);

    useEffect(() => {
        setuser({})
        const controller = new AbortController();
        const signal = controller.signal;

        window.fetch(PATH+`/login/exist`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: signal,
        method: "POST",
        body:JSON.stringify({
          username,
          token
        })

        })
        .then(res => res.json())
        .then(data => {
          if(data.error === 'invalid username or token'){
          }else{
            setuser(data)
            window.localStorage.setItem('token',data.token)
            window.localStorage.setItem('username',data.username)
          }
        })
        .catch((err) => {
            if (err.name === "AbortError") {
              console.log("successfully aborted");
            }
          });
        return () => controller.abort();
        
    }, []);

    return (user);
}

export default useLogin;
