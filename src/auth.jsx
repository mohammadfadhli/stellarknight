import { useEffect, useState, createContext } from "react";
import { auth } from "./firebase.jsx";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [functionIsRunning, setFunctionIsRunning] = useState(true);

    function logOut() {
        auth.signOut()
            .then(() => {
                console.log("Signed Out");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    function logIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("signed in");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    function createUser(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Successfully registered");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("failed to register");
                // ..
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid + " is signed in");
                setCurrentUser("Logged In");
                setIsLoading(false);
                // ...
            } else {
                // User is signed out
                // ...
                console.log("Logged Out");
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, logOut, logIn, createUser, functionIsRunning }}>
            {children}
        </AuthContext.Provider>
    );
}
