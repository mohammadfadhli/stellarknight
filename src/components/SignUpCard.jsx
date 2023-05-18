import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth";

function IsLoggedOut() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate();

    const { createUser, updateUserName } = useContext(AuthContext);
    
    async function signUp(e) {
        e.preventDefault();
        try {
            await createUser(email, password)
            navigate("/", {state: {dn: username}})
            await updateUserName({displayName: username})
            
        } catch (error) {
            console.log(error.code);
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
        </>
    );
}

function SignUpCard() {

    return <IsLoggedOut></IsLoggedOut>
}

export default SignUpCard;
