import { Fragment, useContext, useEffect, useState } from "react";
import { db } from "../firebase.jsx";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../auth.jsx";

function GameCards() {
    const [games, setGames] = useState([]);
    const [gamesId, setGamesId] = useState([]);
    const { currentUser } = useContext(AuthContext);
    let { id } = useParams();
    let [isGamesDeleted, setIsGamesDeleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allgames = [];
                const allgamesid = [];

                const docsSnap = await getDocs(
                    collection(db, `allgames/${id}/games`)
                );
                docsSnap.forEach((doc) => {
                    if (doc.id != "default") {
                        // allgames.push(doc.data());
                        // allgamesid.push(doc.id);
                        allgames.push(doc)
                    }
                });

                setGames(allgames);
                setGamesId(allgamesid);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [isGamesDeleted]);


    async function deleteGame(clickedId) {
        console.log(clickedId);
        await deleteDoc(
            doc(db, `allgames/${currentUser.uid}/games`, clickedId)
        );

        if (isGamesDeleted == false) {
            setIsGamesDeleted(true);
        } else if (isGamesDeleted == true) {
            setIsGamesDeleted(false);
        }

    }

    function IsLoggedIn(i) {
        if (currentUser) {
            if (currentUser.uid === id) {
                return (
                    <>
                        <div class="d-flex flex-row">
                            <div class="">
                                <Link to={"/editreview/" + i.index}>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                </Link>
                            </div>
                            <div class="ps-3">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    id={i.index}
                                    onClick={(e) =>
                                        deleteGame(e.currentTarget.id)
                                    }
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </>
                );
            }
        }
    }

    function RecommendationBadge(props) {
        if (props.recommendation === "recommended") {
            return (
                <p class="card-text badge rounded-pill text-bg-success">
                    Recommended
                </p>
            );
        } else if (props.recommendation === "notRecommended") {
            return (
                <p class="card-text badge rounded-pill text-bg-danger">
                    Not Recommended
                </p>
            );
        } else if (props.recommendation === "mixed") {
            return (
                <p class="card-text badge rounded-pill text-bg-secondary">
                    Mixed
                </p>
            );
        }
    }

    const gameCards = games.map((games, index) => (
        <Fragment key={index}>
            <div className="card mb-3" key={index}>
                <div className="card-body">
                    <h5 className="card-title">{games.data().title}</h5>
                    <p className="card-text">Rating: {games.data().rating}/10</p>
                    <p className="card-text">Review: {games.data().review}</p>
                    <RecommendationBadge
                        recommendation={games.data().recommendation}
                    ></RecommendationBadge>
                    {/* <IsLoggedIn index={gamesId[index]}></IsLoggedIn> */}
                    <IsLoggedIn index={games.id}></IsLoggedIn>
                </div>
            </div>
        </Fragment>
    ));


    if (games.length != 0) {
        return (
            <>
                {gameCards}
            </>
        );
    } else {
        return (
            <>
                <div className="card mb-3">
                    <div className="card-body">No reviews.</div>
                </div>
            </>
        );
    }
}

export default GameCards;
