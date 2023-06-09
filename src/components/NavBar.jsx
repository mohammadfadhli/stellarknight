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
                                    to={"feed"}
                                    className="nav-link"
                                >
                                    Feed
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"profile"}
                                    className="nav-link"
                                >
                                    Edit Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    reloadDocument
                                    to={`profilepage/${props.uid}`}
                                    className="nav-link"
                                >
                                    {props.displayname}
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
                                    to={"feed"}
                                    className="nav-link"
                                >
                                    Feed
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link
                                    reloadDocument
                                    to={"login"}
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
    const { currentUser, isLoading, logOut, displayName } =
        useContext(AuthContext);
    const [showName, setShowName] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setShowName(displayName);
        }
    });

    if (!isLoading) {
        if (showName) {
            return (
                <NavBarIsLoggedIn
                    displayname={showName}
                    handleLogOut={logOut}
                    uid={currentUser.uid}
                ></NavBarIsLoggedIn>
            );
        } else {
            return <NavBarIsLoggedOut></NavBarIsLoggedOut>;
        }
    } else {
    }
}

export default NavBar;
