import { useContext } from "react";
import GameCards from "../components/GameCards";
import { AuthContext } from "../auth";
import { Link } from "react-router-dom";

function IsLoggedIn() {

    const {currentUser} = useContext(AuthContext)

    if(currentUser)
    {
        return (
            <>
                <div class="d-flex flex-row-reverse mt-3">
                    <div class="p-2">
                        <Link reloadDocument
                                    to={"/addgame"}>
                        <button type="button" class="btn btn-primary">
                            Add Entry
                        </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

}

function GameReview() {
    return (
        <>
            <div className="container">
                <h1 className="text-center mt-5">Game Reviews</h1>
                <IsLoggedIn></IsLoggedIn>
            </div>
            <GameCards></GameCards>
        </>
    );
}

export default GameReview;