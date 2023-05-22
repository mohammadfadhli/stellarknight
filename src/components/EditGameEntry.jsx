import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import Error from "./Error";
import db from "../firebase.jsx";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/Login.css";

function IsLoggedIn() {
    const [gameTitle, setGameTitle] = useState("");
    const [gameRating, setGameRating] = useState("");
    const [gameReview, setGameReview] = useState("");
    const [reccommendationRadio, setReccomendationRadio] = useState("");
    const navigate = useNavigate();
    let { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [checkDocIfExist, setCheckDocIfExist] = useState();
    const [isLoaded, setIsLoaded] = useState();
    const docRef = doc(db, `allgames/${currentUser.uid}/games`, id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setGameTitle(docSnap.data().title);
                    setGameRating(docSnap.data().rating);
                    setGameReview(docSnap.data().review);
                    setReccomendationRadio(docSnap.data().recommendation)
                    setCheckDocIfExist(true);
                    setIsLoaded(true);
                } else {
                    // docSnap.data() will be undefined in this case
                    setCheckDocIfExist(false);
                    setIsLoaded(true);
                    console.log("No such document!");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    async function editGame(e) {
        e.preventDefault();

        await updateDoc(docRef, {
            title: gameTitle,
            rating: gameRating,
            review: gameReview,
            recommendation: reccommendationRadio
        });

        console.log("Document written with ID: ", docRef.id);
        navigate(`/games/${currentUser.uid}`);
    }

    if (checkDocIfExist == false && isLoaded == true) {
        return <Error></Error>;
    } else if (checkDocIfExist == true && isLoaded == true) {
        return (
            <>
                <div class="container my-5 loginDiv rounded-3">
                    <h1 class="pt-4 text-center">Edit Entry</h1>
                    <form class="p-4" onSubmit={editGame}>
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
                                value={gameTitle}
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
                                value={gameRating}
                                required
                            />
                            <div id="emailHelp" class="form-text">
                                Give a rating from a scale of 1 to 10.
                            </div>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="reccommendationRadio"
                                id="recommended"
                                value="recommended"
                                onChange={(e) =>
                                    setReccomendationRadio(e.target.value)
                                }
                                checked={reccommendationRadio === "recommended"}
                            />
                            <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                            >
                                Recommended
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="reccommendationRadio"
                                id="notRecommended"
                                value="notRecommended"
                                onChange={(e) =>
                                    setReccomendationRadio(e.target.value)
                                }
                                checked={
                                    reccommendationRadio === "notRecommended"
                                }
                            />
                            <label
                                class="form-check-label"
                                for="flexRadioDefault2"
                            >
                                Not Recommended
                            </label>
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
                                value={gameReview}
                                style={{height: 100}}
                                maxlength="500"
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
}

export default IsLoggedIn;
