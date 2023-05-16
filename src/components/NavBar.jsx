import { Outlet, Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useContext } from "react";
import { AuthContext } from "../auth";

function UserState() {
    const { currentUser, isLoading } = useContext(AuthContext);

    if (!isLoading) {
        if (currentUser) {
            return <NavBarIsLoggedIn></NavBarIsLoggedIn>;
        } else {
            return <NavBarIsLoggedOut></NavBarIsLoggedOut>;
        }
    } else {
    }
}

function NavBarIsLoggedIn() {

    const {logOut} = useContext(AuthContext)

    return (
        <>
            <div id="navbar">
                <ul className="nav justify-content-center">
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"games"} className="nav-link">
                            Game Reviews
                        </Link>
                    </li>
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"/"} className="nav-link" onClick={logOut}>
                            Log Out
                        </Link>
                        
                    </li>
                </ul>
            </div>
            <Outlet></Outlet>
        </>
    );
}

function NavBarIsLoggedOut() {
    return (
        <>
            <div id="navbar">
                <ul className="nav justify-content-center">
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"games"} className="nav-link">
                            Game Reviews
                        </Link>
                    </li>
                    <li className="nav-item my-1">
                        <Link reloadDocument to={"/login"} className="nav-link">
                            Log In
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet></Outlet>
        </>
    );
}

function NavBar() {
    return (
        <>
            <UserState></UserState>
        </>
    );
}

export default NavBar;
