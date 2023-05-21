import { useEffect, useState, Fragment } from "react";
import db from "../firebase.jsx";
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
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });

                setAllUsers(users);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const userCards = allusers.map((user) => (
        // <Fragment key={user.uid}>
        //     <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
        //         <div className="card" key={user.uid}>
        //             <div className="card-body">
        //                 <h5 className="card-title">{user.displayName}'s Game Reviews</h5>
        //                 <Link to={"/games/" + user.uid}>
        //                     <button type="button" class="btn btn-primary">
        //                         Visit
        //                     </button>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>

        <Fragment key={user.uid}>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div className="card">
                    <Link to={"/games/" + user.uid} class="testcard">
                        <div class="d-flex align-items-center ">
                            <div class="flex-shrink-0">
                                <div class="container my-2"><img class="rounded" src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img></div>
                                
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
