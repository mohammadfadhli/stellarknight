import { useContext, useEffect, useState } from "react";
import GameCards from "../components/GameCards";
import { AuthContext } from "../auth";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

function GameReview() {
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();
    const [bio, setBio] = useState(null);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(doc(db, `allgames`, id));

                if (docSnap.exists()) {
                    setBio(docSnap.data().bio);
                    setDisplayName(docSnap.data().displayName);
                }
            } catch {}
        };

        fetchData();
    });

    function IsLoggedIn() {
        if (currentUser) {
            if (currentUser.uid === id) {
                return (
                    <>
                        <Link reloadDocument to={"/profile"}>
                            <button type="button" class="btn btn-secondary">
                                <i class="bi bi-pencil-square"></i> Edit Profile
                            </button>
                        </Link>
                        <Link reloadDocument to={"/addgame"}>
                            <button type="button" class="btn btn-primary ms-3">
                                <i class="bi bi-plus-circle"></i> Add New Review
                            </button>
                        </Link>
                    </>
                );
            }
        }
    }

    function CheckBio() {
        if (bio === "") {
            return <>No bio.</>;
        } else {
            return <>{bio}</>;
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div class="row text-center">
                    <div class="col">
                        <ProfilePicture uid={id}></ProfilePicture>
                    </div>
                </div>

                <div class="row mt-5">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{displayName}</h4>
                                <p class="card-text">
                                    <CheckBio></CheckBio>
                                </p>
                                <IsLoggedIn className="ms-auto"></IsLoggedIn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card my-3">
                    <div class="card-body">
                        <h4 class="card-title">Game Reviews</h4>
                        <p class="card-text">
                            <GameCards></GameCards>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameReview;
