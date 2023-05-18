import { Outlet, Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";

function NavBarIsLoggedIn(props) {

    return (
        <>
            <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse justify-content-center"
                        id="navbarNav"
                    >
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"/"}
                                    className="nav-link"
                                >
                                    Home
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"games"}
                                    className="nav-link"
                                >
                                    Game Reviews
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={""}
                                    className="nav-link"
                                >
                                    Welcome back, {props.displayname}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    reloadDocument
                                    to={"/"}
                                    className="nav-link"
                                    onClick={props.handleLogOut}
                                >
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

function NavBarIsLoggedOut() {
    return (
        <>
            <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse justify-content-center"
                        id="navbarNav"
                    >
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"/"}
                                    className="nav-link"
                                >
                                    Home
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"games"}
                                    className="nav-link"
                                >
                                    Game Reviews
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"/login"}
                                    className="nav-link"
                                >
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

function NavBar() {
    const { currentUser, isLoading, logOut } = useContext(AuthContext);
    const [showName, setShowName] = useState("")

    const location = useLocation();
    useEffect(() => {
        if(location.state) // if from signup, retrieve passed username state
        {
            setShowName(location.state.dn)
        }
        else if(currentUser) // if not from signup, retrieve from auth
        {
            setShowName(currentUser.displayName)
        }
    })

    if (!isLoading) {
        if (currentUser) {
            console.log(currentUser.displayName)
            return <NavBarIsLoggedIn displayname={showName} handleLogOut={logOut}></NavBarIsLoggedIn>;
        } else {
            return <NavBarIsLoggedOut></NavBarIsLoggedOut>;
        }
    } else {
    }
}

export default NavBar;
