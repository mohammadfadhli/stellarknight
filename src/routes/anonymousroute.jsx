import { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate, Outlet } from "react-router-dom";

function AnonymousRoute() {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return (
            <>
                <Outlet></Outlet>
            </>
        );
    } else {
        return <Navigate to="/"></Navigate>;
    }
}

export default AnonymousRoute