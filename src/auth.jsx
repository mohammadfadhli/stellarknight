import { useEffect, useState, createContext } from "react";
import { auth } from "./firebase.jsx";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    updateEmail
} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");

    function logOut() {
        return auth.signOut();
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function updateUserName(params) {
        setDisplayName(params.displayName)
        return updateProfile(auth.currentUser, params);
    }

    function updateUserEmail(email) {
        return updateEmail(auth.currentUser, email);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid + " is signed in");
                setCurrentUser(user);
                setDisplayName(user.displayName)
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
        <AuthContext.Provider
            value={{
                currentUser,
                isLoading,
                logOut,
                logIn,
                createUser,
                updateUserName,
                displayName,
                updateUserEmail
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
