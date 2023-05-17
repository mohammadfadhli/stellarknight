import { Fragment, useEffect, useState } from "react";
import { db } from "../firebase.jsx";
import { collection, getDocs } from "firebase/firestore";

function GameCards() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const allgames = []

                const querySnapshot = await getDocs(collection(db, "games"));
                querySnapshot.forEach((doc) => {
                    games.push(doc.data());
                    allgames.push(doc.data())
                });

                setGames(allgames)

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const gameCards = games.map((games, index) => (
        <Fragment key={index}>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div className="card" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{games.title}</h5>
                        <p className="card-text">Rating: {games.rating}</p>
                        <p className="card-text">Review: {games.review}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    ));

    return (
        <>
            <div className="container my-5">
                <h1 className="text-center">Game Reviews</h1>
                <div className="row">{gameCards}</div>
            </div>
        </>
    );
}

export default GameCards;
