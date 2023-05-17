import { useContext, useState } from "react";
import { AuthContext } from "../auth";
import Error from "./Error";
import db from "../firebase.jsx";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function IsLoggedIn() {
    const [gameTitle, setGameTitle] = useState("");
    const [gameRating, setGameRating] = useState("");
    const [gameReview, setGameReview] = useState("");
    const navigate = useNavigate()

    async function addGame(e) {
        e.preventDefault();

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "games"), {
            title: gameTitle,
            rating: gameRating,
            review: gameReview
        });
        console.log("Document written with ID: ", docRef.id);
        navigate("/games")
    }

    return (
        <>
            <div class="container my-5 loginDiv rounded-3">
                <h1 class="pt-4 text-center">Add New Entry</h1>
                <form class="p-4" onSubmit={addGame}>
                    <div class="mb-3">
                        <label for="gameTitle" class="form-label">
                            Game Title
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="gameTitle"
                            aria-describedby="emailHelp"
                            onChange={(e) => setGameTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="gameRating" class="form-label">
                            Rating
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            class="form-control"
                            id="gameRating"
                            aria-describedby="emailHelp"
                            onChange={(e) => setGameRating(e.target.value)}
                            required
                        />
                        <div id="emailHelp" class="form-text">Give a rating from a scale of 1 to 10.</div>
                    </div>
                    <div class="mb-3">
                        <label for="gameReview" class="form-label">
                            Review
                        </label>
                        <textarea 
                            type="text"
                            class="form-control"
                            id="gameReview"
                            onChange={(e) => setGameReview(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

function NewGameEntry() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <IsLoggedIn></IsLoggedIn>;
    } else {
        return <Error></Error>;
    }
}

export default NewGameEntry;
