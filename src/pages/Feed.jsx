import { useEffect, useState, Fragment } from "react";
import { db } from "../firebase.jsx";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/CardStyle.css";

function Feed() {
    const [allusers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = [];

                const querySnapshot = await getDocs(collection(db, "allgames"));
                querySnapshot.forEach(async (doc) => {
                    users.push(doc.data());
                });

                setAllUsers(users);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    console.log(allusers);

    const userCards = allusers.map((user) => (

        <Fragment key={user.uid}>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div className="card">
                    <Link to={"/games/" + user.uid} class="testcard">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded"
                                        src={user.profilepicture}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                {user.displayName}'s Game Reviews
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    ));

    return (
        <>
            <div class="container mt-5">
                <div class="row">{userCards}</div>
            </div>
        </>
    );
}

export default Feed;
