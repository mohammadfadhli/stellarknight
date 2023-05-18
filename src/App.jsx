import Home from "./pages/Home.jsx";
import GameCards from "./components/GameCards.jsx";
import GameReview from "./pages/GameReview.jsx";
import LoginCard from "./components/LoginCard.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpCard from "./components/SignUpCard.jsx";
import NewGameEntry from "./components/NewGameEntry.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import EditGameReview from "./pages/EditGameReview.jsx";
import ProtectedRoutes from "../protectedroutes.jsx";
import AnonymousRoute from "../anonymousroute.jsx";

const router = createBrowserRouter([
    {
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
                path: "/",
                index: true,
                element: <Home></Home>,
            },
            {
                path: "games",
                element: <GameReview></GameReview>,
            },
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
