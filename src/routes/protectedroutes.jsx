import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth";

function ProtectedRoutes() {
    const { currentUser } = useContext(AuthContext);

    console.log("CHECK: " + currentUser);

    if (currentUser) {
        return (
            <>
                <Outlet></Outlet>
            </>
        );
    } else {
        return <Navigate to="/"></Navigate>;
    }
}

export default ProtectedRoutes;
