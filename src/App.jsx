import Home from "./pages/Home.jsx";
import GameCards from "./components/GameCards.jsx";
import LoginCard from "./components/LoginCard.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpCard from "./components/SignUpCard.jsx";
// import LogOut from "./pages/Logout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";

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
                element: <GameCards></GameCards>,
            },
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
