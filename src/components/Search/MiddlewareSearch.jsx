import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const MiddlewareSearch = () => {
    const search = window.location.pathname.slice(8)
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/search/${search}`)

    }, [search]);

    return (
        <></>
    );
}

export default MiddlewareSearch;