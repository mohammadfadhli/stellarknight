import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth";

function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    async function signIn(e) {
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.code)
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
        </>
    );
}

export default LoginCard;
