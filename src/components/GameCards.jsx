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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allgames = [];
                const allgamesid = [];

                // get allgames from userid
                const docsSnap = await getDocs(
                    collection(db, `allgames/${id}/games`)
                );
                docsSnap.forEach((doc) => {
                    if (doc.id != "default") {
                        games.push(doc.data());
                        allgames.push(doc.data());
                        allgamesid.push(doc.id);
                    }
                });

                setGames(allgames);
                setGamesId(allgamesid);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    async function deleteGame(clickedId) {
        console.log(clickedId);
        await deleteDoc(doc(db, `allgames/${currentUser.uid}/games`, clickedId))

        window.location.reload();
    }

    function IsLoggedIn(i) {
        const { currentUser } = useContext(AuthContext);

        if (currentUser) {
            if(currentUser.uid === id)
            {
                return (
                    <>
                        <div class="d-flex flex-row">
                            <div class="">
                                <Link to={"/editreview/" + i.index}>
                                    <button type="button" class="btn btn-primary">
                                        Edit
                                    </button>
                                </Link>
                            </div>
                            <div class="ps-3">
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    id={i.index}
                                    onClick={(e) => deleteGame(e.target.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                );
            }
            
        }
    }

    const gameCards = games.map((games, index) => (
        <Fragment key={index}>
            {/* <div className="col-lg-4 col-md-6 col-sm-12 mt-3"> */}
            <div className="col-12 mt-3">
                <div className="card" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{games.title}</h5>
                        <p className="card-text">Rating: {games.rating}</p>
                        <p className="card-text">Review: {games.review}</p>
                        <IsLoggedIn index={gamesId[index]}></IsLoggedIn>
                    </div>
                </div>
            </div>
        </Fragment>
    ));

    return (
        <>
            <div className="container mt-3 mb-5">
                <div className="row">{gameCards}</div>
            </div>
        </>
    );
}

export default GameCards;
