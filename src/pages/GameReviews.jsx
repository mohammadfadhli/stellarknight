import { useContext } from "react";
import GameCards from "../components/GameCards";
import { AuthContext } from "../auth";
import { Link, useParams } from "react-router-dom";

function GameReviews() {
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();

    function IsLoggedIn() {
        if (currentUser) {
            if (currentUser.uid === id) {
                return (
                    <>
                        <Link reloadDocument to={"/addgame"}>
                            <button type="button" class="btn btn-primary ms-3 mb-3">
                                <i class="bi bi-plus-circle"></i> Add New Review
                            </button>
                        </Link>
                    </>
                );
            }
        }
    }

    return (
        <>
            <div class="container mt-5">
                <IsLoggedIn></IsLoggedIn>
                <GameCards></GameCards>
            </div>
        </>
    );
}

export default GameReviews;
