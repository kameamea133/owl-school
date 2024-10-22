import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const Privateroute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        userInfo ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Privateroute