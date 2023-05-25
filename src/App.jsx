import Home from "./pages/Home.jsx";
import LoginCard from "./components/LoginCard.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpCard from "./components/SignUpCard.jsx";
import NewGameEntry from "./components/NewGameEntry.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import EditGameReview from "./pages/EditGameReview.jsx";
import ProtectedRoutes from "./routes/protectedroutes.jsx";
import AnonymousRoute from "./routes/anonymousroute.jsx";
import Error from "./components/Error.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Feed from "./pages/Feed.jsx"
import Profile from "./pages/Profile.jsx";
import FriendList from "./components/FriendList.jsx";
import GameReviews from "./pages/GameReviews.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar></NavBar>, // ensures that every page renders the navbar component
        children: [
            {
                element: <ProtectedRoutes></ProtectedRoutes>, // pages that require authentication goes here
                children: [
                    {
                        path: "addgame",
                        element: <NewGameEntry></NewGameEntry>,
                    },
                    {
                        path: "editreview/:id",
                        element: <EditGameReview></EditGameReview>,
                    },
                    {
                        path: "profile",
                        element: <Profile></Profile>
                    },
                ],
            },
            {
                element: <AnonymousRoute></AnonymousRoute>, // pages that require non authentication goes here
                children: [
                    {
                        path: "login",
                        element: <LoginCard></LoginCard>,
                    },
                    {
                        path: "signup",
                        element: <SignUpCard></SignUpCard>,
                    },
                ],
            },
            // pages that require neither goes here
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "*",
                element: <Error></Error> // show 404 error page if path doesn't exist
            },
            {
                path: "profilepage/:id",
                element: <ProfilePage></ProfilePage>
            },
            {
                path: "reviews/:id",
                element: <GameReviews></GameReviews>
            },
            {
                path: "friends/:id",
                element: <FriendList></FriendList>
            },
            {
                path: "feed",
                element: <Feed></Feed>
            }
        ],
    },
]);

function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </>
    );
}

export default App;
