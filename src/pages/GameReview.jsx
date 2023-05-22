import { useContext, useEffect, useState } from "react";
import GameCards from "../components/GameCards";
import { AuthContext } from "../auth";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";

function IsLoggedIn() {
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();

    if (currentUser) {
        if (currentUser.uid === id) {
            return (
                <>
                    <div class="d-flex flex-row-reverse mt-3">
                        <div class="p-2">
                            <Link reloadDocument to={"/addgame"}>
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
}

function GameReview() {
    const { id } = useParams();

    return (
        <>
            <div className="container">
                <div class="container mt-5">
                    <div class="row row-cols-auto text-center">
                        <div class="col-sm-12 col-lg-4">
                            <ProfilePicture uid={id}></ProfilePicture>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                            <h1>Game Reviews</h1>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                            <IsLoggedIn className="ms-auto"></IsLoggedIn>
                        </div>
                    </div>
                </div>
            </div>
            <GameCards></GameCards>
        </>
    );
}

export default GameReview;
