import { useContext, useEffect, useState } from "react";
import GameCards from "../components/GameCards";
import { AuthContext } from "../auth";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getCountFromServer,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";
import Posts from "../components/Posts";

function ProfilePage() {
    const { currentUser, friendsList } = useContext(AuthContext);
    const { id } = useParams();
    const [bio, setBio] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [country, setCountry] = useState("");
    const [frenList, setFrenList] = useState([]);
    const [numOfReviews, setNumOfreviews] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(doc(db, `allgames`, id));

                if (docSnap.exists()) {
                    setBio(docSnap.data().bio);
                    setCountry(docSnap.data().location);
                    setDisplayName(docSnap.data().displayName);
                    setFrenList(docSnap.data().friends);
                }
            } catch {}
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coll = collection(db, `allgames/${id}/games`);
                const snapshot = await getCountFromServer(coll);
                console.log("count: ", snapshot.data().count);
                setNumOfreviews(snapshot.data().count);
            } catch {}
        };

        fetchData();
    });

    async function addFriend() {
        await updateDoc(doc(db, "allgames", currentUser.uid), {
            friends: arrayUnion(id),
        });

        await updateDoc(doc(db, "allgames", id), {
            friends: arrayUnion(currentUser.uid),
        });

        window.location.reload();
    }

    async function deleteFriend() {
        await updateDoc(doc(db, "allgames", currentUser.uid), {
            friends: arrayRemove(id),
        });

        await updateDoc(doc(db, "allgames", id), {
            friends: arrayRemove(currentUser.uid),
        });

        window.location.reload();
    }

    function IsFriend() {
        if (currentUser) {
            if (currentUser.uid !== id) {
                if (friendsList.includes(id)) {
                    return (
                        <>
                            {" "}
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={deleteFriend}
                            >
                                <i class="bi bi-plus-circle"></i> Remove as
                                Friend
                            </button>
                        </>
                    );
                } else {
                    return (
                        <>
                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={addFriend}
                            >
                                <i class="bi bi-plus-circle"></i> Add as Friend
                            </button>
                        </>
                    );
                }
            }
        }
    }

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

    function CountryComponent() {
        if (country == "donotdisplay") {
            return <></>;
        } else {
            return <>{country}</>;
        }
    }

    function DisplayFriends() {
        if (frenList.length == 1) {
            return <>{frenList.length} friend</>;
        } else {
            return <>{frenList.length} friends</>;
        }
    }

    function DisplayGameReviews() {
        if (numOfReviews == 1) {
            return <>{numOfReviews} review</>;
        } else {
            return <>{numOfReviews} reviews</>;
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

                <div class="card mb-3 mt-5">
                    <div class="card-body">
                        <h4 class="card-title">{displayName}</h4>
                        <h6 class="card-subtitle mt-2 text-body-white">
                            <CountryComponent></CountryComponent>
                        </h6>
                        <p class="card-text mt-3">
                            <CheckBio></CheckBio>
                        </p>
                        <IsLoggedIn className="ms-auto"></IsLoggedIn>
                        <IsFriend></IsFriend>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <div class="container mb-3">
                            <h3 style={{ margin: 0 }}>Friends</h3>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="container mb-3">
                            <h3 style={{ margin: 0 }}>Reviews</h3>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <Link
                            to={"/friends/" + id}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h4 class="card-text">
                                        <DisplayFriends></DisplayFriends>
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col-6">
                        <Link
                            to={"/reviews/" + id}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h4 class="card-text">
                                        <DisplayGameReviews></DisplayGameReviews>
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div class="container mb-3">
                    <h3 style={{ margin: 0 }}>Timeline</h3>
                </div>
                <Posts></Posts>
            </div>
        </>
    );
}

export default ProfilePage;
