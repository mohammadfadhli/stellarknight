import Home from "./pages/Home.jsx";
import GameCards from "./components/GameCards.jsx";
import GameReview from "./pages/GameReview.jsx"
import LoginCard from "./components/LoginCard.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpCard from "./components/SignUpCard.jsx";
import NewGameEntry from "./components/NewGameEntry.jsx";
// import LogOut from "./pages/Logout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import EditGameReview from "./pages/EditGameReview.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "games",
                element: <GameReview></GameReview>,
            },
            {
                path: "login",
                element: <LoginCard></LoginCard>,
            },
            {
                path: "signup",
                element: <SignUpCard></SignUpCard>,
            },
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
