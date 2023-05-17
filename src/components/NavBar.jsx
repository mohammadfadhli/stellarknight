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
    const { logOut, currentUser } = useContext(AuthContext);

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
                                    Welcome back, {currentUser.displayName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    reloadDocument
                                    to={"/"}
                                    className="nav-link"
                                    onClick={logOut}
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
    return (
        <>
            <UserState></UserState>
        </>
    );
}

export default NavBar;
