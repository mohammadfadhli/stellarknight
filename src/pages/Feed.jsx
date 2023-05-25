import { useEffect, useState, Fragment, useContext } from "react";
import { db } from "../firebase.jsx";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/CardStyle.css";
import { AuthContext } from "../auth.jsx";
import Posts from "../components/Posts.jsx";
import AddPost from "../components/AddPost.jsx";

function Feed() {
    const [allusers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser, friendsList } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = [];

                const querySnapshot = await getDocs(collection(db, "allgames"));
                querySnapshot.forEach(async (doc) => {
                    // users.push(doc.data());

                    if (currentUser != null) {
                        if (currentUser.uid != doc.id) {
                            users.push(doc.data());
                        }
                    } else {
                        users.push(doc.data());
                    }
                });

                setAllUsers(users);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    let userCards = null;

    userCards = allusers.map((user) => (
        <Fragment key={user.uid}>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div className="card">
                    <Link to={"/profilepage/" + user.uid} class="testcard">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2">
                                    <img
                                        class="rounded border border-black"
                                        src={user.profilepicture}
                                        style={{ width: 60 }}
                                    ></img>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                {user.displayName}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>
    ));

    function IsLoggedIn() {
        if (currentUser) {
            return (
                <>
                    <AddPost></AddPost>
                </>
            );
        }
    }

    return (
        <>
            <div class="container mt-5">
                <IsLoggedIn></IsLoggedIn>
                <h4 class="mt-3">Check out other users</h4>
                <div class="row">{userCards}</div>
            </div>
        </>
    );
}

export default Feed;
