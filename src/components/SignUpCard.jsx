import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { db } from "../firebase.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import Alert from "./Alert";

function IsLoggedOut() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate();

    const { createUser, updateUserName } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");

    async function signUp(e) {
        e.preventDefault();
        try {
            await createUser(email, password).then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "allgames", user.uid), {
                    displayName: username,
                    uid: user.uid,
                    profilepicture: "https://firebasestorage.googleapis.com/v0/b/stellarknight2-eddf1.appspot.com/o/users%2Fdefaultdp.png?alt=media&token=979791e0-ff90-40b7-ab8c-38f2579a05cb"
                }).then(() => {
                    const docRef = doc(db, "allgames", user.uid);
                    const colRef = collection(docRef, "games");
                    setDoc(doc(colRef, "default"), {
                        title: "title",
                        rating: "rating",
                        review: "review",
                    });
                });
            });
            await updateUserName({ displayName: username });
            navigate("/");
        } catch (error) {
            console.log(error.code);
            if(error.code == "auth/weak-password")
            {
                setErrorMsg("Your password is too weak. Please pick a stronger password.")
            }
            else if(error.code == "auth/email-already-in-use")
            {
                setErrorMsg("This Email is already in use.")
            }
            else
            {
                setErrorMsg(error.code)
            }
        }
    }

    useEffect(() => {
        if (errorMsg) {
            const toRef = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(toRef);
            }, 2000);
        }
    }, [errorMsg]);

    function ShowAlert() {
        if (errorMsg) {
            return (
                <>
                    <Alert status="danger" text={errorMsg}></Alert>
                </>
            );
        }
    }

    return (
        <>
            <div className="container mt-5 loginDiv rounded-3">
                <h1 className="pt-4 text-center">Sign Up</h1>
                <form className="p-4" onSubmit={signUp}>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputUserName1"
                            className="form-label"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUserName1"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p>
                            Already have an account?{" "}
                            <Link to={"/login"}>Log In Here</Link>
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
            <div class="container">
                <ShowAlert></ShowAlert>
            </div>
        </>
    );
}

function SignUpCard() {
    return <IsLoggedOut></IsLoggedOut>;
}

export default SignUpCard;
