import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import Alert from "./Alert";

function IsLoggedOut() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    async function signIn(e) {
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate("/");
        } catch (error) {
            if(error.code == "auth/too-many-requests")
            {
                setErrorMsg("Too many failed login attempts. Please try again later.")
            }
            else if(error.code == "auth/wrong-password" || error.code == "auth/user-not-found")
            {
                setErrorMsg("Incorrect Email or Password")
            }
            else
            {
                setErrorMsg(error.code)
            }
            console.log(error.code);
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
                <h1 className="pt-4 text-center">Log In</h1>
                <form className="p-4" onSubmit={signIn}>
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            Don't have an account?{" "}
                            <Link to={"/signup"}>Sign Up Here</Link>
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Log In
                    </button>
                </form>
            </div>
            <div class="container mt-3">
                <ShowAlert></ShowAlert>
            </div>
            
        </>
    );
}

function LoginCard() {
    return <IsLoggedOut></IsLoggedOut>;
}

export default LoginCard;
