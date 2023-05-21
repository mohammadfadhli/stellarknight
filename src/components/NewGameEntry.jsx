import { useContext, useState } from "react";
import { AuthContext } from "../auth";
import Error from "./Error";
import db from "../firebase.jsx";
import { collection, addDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function NewGameEntry() {
    const [gameTitle, setGameTitle] = useState("");
    const [gameRating, setGameRating] = useState("");
    const [gameReview, setGameReview] = useState("");
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function addGame(e) {
        e.preventDefault();

        const docRef = doc(db, "allgames", currentUser.uid);
        const colRef = collection(docRef, "games");
        await addDoc(colRef, {
            title: gameTitle,
            rating: gameRating,
            review: gameReview,
        });

        console.log("Document written with ID: ", docRef.id);
        navigate(`/games/${currentUser.uid}`);
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
                        <div id="emailHelp" class="form-text">
                            Give a rating from a scale of 1 to 10.
                        </div>
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

export default NewGameEntry;
